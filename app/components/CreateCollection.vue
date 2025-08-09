<template>
  <UCard class="w-full">
    <template #header>
      <h3 class="text-lg font-semibold">Create NFT Collection</h3>
    </template>

    <UForm :state="form" @submit="handleSubmit" class="space-y-4 flex flex-col">
      <UFormField label="Admin Account" name="admin">
        <UInput
          v-model="form.admin"
          placeholder="Admin address (leave empty for self)"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Collection ID" name="collectionId">
        <UInput
          v-model="form.collectionId"
          placeholder="Collection ID (number, default: 0)"
          type="number"
          class="w-full"
        />
        <p v-if="collectionIdError" class="text-error-500">
          {{ collectionIdError }}
        </p>
      </UFormField>

      <UFormField label="Max Supply" name="maxSupply">
        <UInput
          v-model="form.maxSupply"
          placeholder="Max supply (optional)"
          type="number"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Mint Type" name="mintType">
        <USelect
          v-model="form.mintType"
          :options="mintTypeOptions"
          placeholder="Select mint type"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Price" name="price">
        <UInput
          v-model="form.price"
          placeholder="Price (optional)"
          type="number"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Start Block" name="startBlock">
        <UInput
          v-model="form.startBlock"
          placeholder="Start block (optional)"
          type="number"
          class="w-full"
        />
      </UFormField>

      <UFormField label="End Block" name="endBlock">
        <UInput
          v-model="form.endBlock"
          placeholder="End block (optional)"
          type="number"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Default Item Settings" name="defaultItemSettings">
        <UInput
          v-model="form.defaultItemSettings"
          placeholder="Default item settings (number, default: 0)"
          type="number"
          class="w-full"
        />
      </UFormField>

      <UButton
        type="submit"
        :loading="isLoading"
        :disabled="!canSubmit"
        color="primary"
        class="cursor-pointer"
        block
      >
        Create Collection
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
  admin: "",
  collectionId: "0",
  maxSupply: "",
  mintType: "Issuer",
  price: "",
  startBlock: "",
  endBlock: "",
  defaultItemSettings: "0",
});
const collectionIdError = ref<string | null>(null);
watch(
  () => form.collectionId,
  async (id) => {
    if (Number(id) < 0) {
      collectionIdError.value = "Collection ID must be > 0";
      return;
    }
    const res = await api.value?.query.nfts.collection(id);
    if (res?.isSome) {
      const data = await res.unwrap();
      collectionIdError.value = `Collection exists. Owner ${formatAddress(
        data.owner.toString()
      )}`;
      return;
    }
    collectionIdError.value = null;
  },
  {
    immediate: true,
  }
);

const mintTypeOptions = [
  { label: "Issuer", value: "Issuer" },
  { label: "Public", value: "Public" },
  { label: "HolderOf", value: "HolderOf" },
];

const canSubmit = computed(() => {
  console.log(
    "Checking canSubmit",
    api.value,
    selectedAccount.value,
    form.admin
  );
  return api.value && selectedAccount.value && form.admin;
});

watch(selectedAccount, (newAccount) => {
  if (newAccount) {
    form.admin = newAccount.address;
  }
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

  if (!form.admin) {
    toast.add({
      title: "Error",
      description: "Admin address is required",
      color: "error",
    });
    return;
  }

  try {
    isLoading.value = true;
    lastResult.value = "";

    const admin = form.admin || selectedAccount.value.address;

    // Build the config object based on the form
    const config = {
      settings: parseInt(form.collectionId) || 0,
      maxSupply: form.maxSupply ? parseInt(form.maxSupply) : null,
      mintSettings: {
        mintType: form.mintType,
        price: form.price ? parseInt(form.price) : null,
        startBlock: form.startBlock ? parseInt(form.startBlock) : null,
        endBlock: form.endBlock ? parseInt(form.endBlock) : null,
        defaultItemSettings: parseInt(form.defaultItemSettings) || 0,
      },
    };

    // Create the collection transaction
    const tx = api.value.tx.nfts.create(admin, config);

    await signAndSend(tx, (result) => {
      lastResult.value = `Collection created in block: ${result.status.asInBlock}`;
      toast.add({
        title: "Success",
        description: `Collection created successfully!`,
        color: "success",
      });
    });

    // Reset form
    form.collectionId = "0";
    form.maxSupply = "";
    form.mintType = "Issuer";
    form.price = "";
    form.startBlock = "";
    form.endBlock = "";
    form.defaultItemSettings = "0";
  } catch (error: any) {
    console.error("Collection creation failed:", error);
    toast.add({
      title: "Transaction Failed",
      description: error.message || "Failed to create collection",
      color: "error",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
