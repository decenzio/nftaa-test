<template>
  <UCard class="w-full">
    <template #header>
      <h3 class="text-lg font-semibold">Create NFT</h3>
    </template>

    <UForm :state="form" @submit="handleSubmit" class="space-y-4">
      <UFormField label="Collection ID" name="collectionId">
        <UInput
          v-model="form.collectionId"
          placeholder="Collection ID"
          type="number"
          class="w-full"
        />
        <p v-if="collectionIdError" class="text-error-500">
          {{ collectionIdError }}
        </p>
      </UFormField>

      <UFormField label="Item ID" name="itemId">
        <UInput
          v-model="form.itemId"
          placeholder="Item ID"
          type="number"
          class="w-full"
        />
        <p v-if="itemIdError" class="text-error-500">
          {{ itemIdError }}
        </p>
      </UFormField>

      <UFormField label="Owner" name="owner">
        <UInput
          v-model="form.owner"
          placeholder="Owner address (leave empty for self)"
          class="w-full"
        />
      </UFormField>

      <UFormField label="NFT Metadata" name="metadata">
        <UTextarea
          v-model="form.metadata"
          placeholder="NFT metadata (JSON)"
          :rows="4"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Use NFTAA Pallet" name="useNftaa">
        <div class="flex items-center gap-2">
          <USwitch v-model="form.useNftaa" />
          <p class="text-xs text-gray-500">
            Toggle to use {{ form.useNftaa ? "nftaa" : "nfts" }} pallet for
            minting
          </p>
        </div>
      </UFormField>

      <UButton
        type="submit"
        :loading="isLoading"
        :disabled="!canSubmit"
        color="primary"
        class="cursor-pointer"
        block
      >
        Mint NFT ({{ form.useNftaa ? "NFTAA" : "NFTs" }} pallet)
      </UButton>
    </UForm>

    <div v-if="lastResult" class="mt-4 p-3 bg-gray-50 rounded-lg">
      <p class="text-sm font-medium">Last Transaction:</p>
      <p class="text-xs text-gray-600 break-all">{{ lastResult }}</p>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const { api, selectedAccount, signAndSend } = usePolkadot();
const toast = useToast();

const isLoading = ref(false);
const lastResult = ref("");
const itemIdError = ref<string | null>(null);
const collectionIdError = ref<string | null>(null);

const form = reactive({
  collectionId: "0",
  itemId: "0",
  owner: "",
  metadata:
    '{"name": "Test NFT", "description": "A test NFT", "image": "https://example.com/image.png"}',
  useNftaa: false,
});

// Watch for changes in collection ID and item ID to check if NFT exists
watch(
  [api, () => form.collectionId, () => form.itemId],
  async ([api, collectionId, itemId]) => {
    if (!api) {
      itemIdError.value = null;
      return;
    }

    if (Number(itemId) < 0) {
      itemIdError.value = "Item ID must be >= 0";
      return;
    }

    if (Number(collectionId) < 0) {
      itemIdError.value = "Collection ID must be >= 0";
      return;
    }

    try {
      const res = await api.query.nfts.collection(collectionId);
      if (!res.isSome) {
        collectionIdError.value = `Collection ${collectionId} does not exist`;
        return;
      }
    } catch (error) {
      collectionIdError.value = `Error checking collection existence`;
      console.error("Error checking collection existence:", error);
      return;
    }

    try {
      // Check if NFT already exists
      const res = await api.query.nfts.item(collectionId, itemId);
      if (res?.isSome) {
        const data = await res.unwrap();
        const meta = await api.query.nfts.itemMetadataOf(collectionId, itemId);
        const nftaa_address = await api.query.nfts.attribute(
          collectionId,
          itemId,
          { CollectionOwner: null },
          0
        );
        console.log("NFTAA Address:", nftaa_address.toHuman());
        itemIdError.value = `NFT exists. Owner ${formatAddress(
          data.owner.toString()
        )}. Metadata: ${meta ? JSON.stringify(meta.toJSON()) : "None"}`;
        return;
      }
    } catch (error) {
      // If there's an error querying, it might mean the collection doesn't exist
      // We'll let the transaction handle this error
      itemIdError.value = `Error checking NFT existence`;
      console.error("Error checking NFT existence:", error);
      return;
    }
    itemIdError.value = null;
    collectionIdError.value = null;
  },
  {
    immediate: true,
  }
);

const canSubmit = computed(() => {
  return (
    api.value &&
    selectedAccount.value &&
    !Number.isNaN(Number(form.collectionId)) &&
    !Number.isNaN(Number(form.itemId)) &&
    !itemIdError.value
  );
});

const handleSubmit = async () => {
  if (!api.value || !selectedAccount.value) {
    toast.add({
      title: "Error",
      description: "Please connect wallet and node first",
      color: "error",
    });
    return;
  }
  try {
    isLoading.value = true;
    lastResult.value = "";

    const owner = form.owner || selectedAccount.value.address;
    const pallet = form.useNftaa ? "nftaa" : "nfts";

    // Create mint transaction
    const mintTx = api.value.tx[pallet].mint(
      form.collectionId,
      form.itemId,
      owner,
      undefined // witness data, usually not needed for testing
    );

    // Create metadata transaction if metadata is provided
    const transactions = [mintTx];

    if (!form.metadata.trim()) {
      toast.add({
        title: "Empty Metadata",
        description: "Metadata must be valid JSON",
        color: "error",
      });
      return;
    }

    try {
      // Validate JSON
      const res = JSON.parse(form.metadata);
      const meta = await pinJson(res);

      const metadataTx = api.value.tx.nfts.setMetadata(
        form.collectionId,
        form.itemId,
        meta
      );
      transactions.push(metadataTx);
    } catch (error) {
      toast.add({
        title: "Invalid Metadata",
        description: "Metadata must be valid JSON",
        color: "error",
      });
      return;
    }

    try {
      const batchTx = api.value.tx.utility.batchAll(transactions);
      await signAndSend(batchTx, (result) => {
        lastResult.value = `NFT created in block: ${result.status.asInBlock}`;
        toast.add({
          title: "Success",
          description: `NFT ${form.itemId} minted successfully using ${pallet} pallet!`,
          color: "success",
        });
      });
    } catch (error) {
      throw error;
    }

    // Reset form
    form.collectionId = "";
    form.itemId = "";
    form.owner = "";
  } catch (error: any) {
    console.error("NFT minting failed:", error);
    toast.add({
      title: "Transaction Failed",
      description: error.message || "Failed to mint NFT",
      color: "error",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
