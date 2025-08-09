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
  [() => form.collectionId, () => form.itemId],
  async ([collectionId, itemId]) => {
    if (!api.value || !collectionId || !itemId) {
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
      // Check if NFT already exists
      const res = await api.value.query.nfts.item(collectionId, itemId);
      if (res?.isSome) {
        const data = await res.unwrap();
        itemIdError.value = `NFT exists. Owner ${formatAddress(
          data.owner.toString()
        )}`;
        return;
      }
      itemIdError.value = null;
    } catch (error) {
      // If there's an error querying, it might mean the collection doesn't exist
      // We'll let the transaction handle this error
      itemIdError.value = null;
    }
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

  if (!form.collectionId || !form.itemId) {
    toast.add({
      title: "Error",
      description: "Collection ID and Item ID are required",
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
      JSON.parse(form.metadata);

      const metadataTx = api.value.tx.nfts.setMetadata(
        form.collectionId,
        form.itemId,
        form.metadata
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
      const batchTx = api.value.tx.palletUtility.batchAll(transactions);
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
