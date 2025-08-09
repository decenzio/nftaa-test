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

const form = reactive({
  collectionId: "",
  itemId: "",
  owner: "",
  metadata:
    '{"name": "Test NFT", "description": "A test NFT", "image": "https://example.com/image.png"}',
  useNftaa: false,
});

const canSubmit = computed(() => {
  return api.value && selectedAccount.value && form.collectionId && form.itemId;
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

    if (form.metadata.trim()) {
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
    }

    // Execute transactions
    if (transactions.length > 1) {
      // Try to use batch if available, otherwise execute sequentially
      try {
        const batchTx = api.value.tx.utility?.batchAll?.(transactions);
        if (batchTx) {
          await signAndSend(batchTx, (result) => {
            lastResult.value = `NFT created in block: ${result.status.asInBlock}`;
            toast.add({
              title: "Success",
              description: `NFT ${form.itemId} minted successfully using ${pallet} pallet!`,
              color: "success",
            });
          });
        } else {
          // Execute sequentially if batch not available
          for (const tx of transactions) {
            await signAndSend(tx);
          }
          lastResult.value = `NFT transactions completed`;
          toast.add({
            title: "Success",
            description: `NFT ${form.itemId} minted successfully using ${pallet} pallet!`,
            color: "success",
          });
        }
      } catch (error) {
        throw error;
      }
    } else {
      await signAndSend(transactions[0]!, (result) => {
        lastResult.value = `NFT created in block: ${result.status.asInBlock}`;
        toast.add({
          title: "Success",
          description: `NFT ${form.itemId} minted successfully using ${pallet} pallet!`,
          color: "success",
        });
      });
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
