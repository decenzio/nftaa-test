<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const colorMode = useColorMode();
const { isConnected, selectedAccount, connectToNode, nodeUrl } = usePolkadot();

const isWalletModalOpen = ref(false);

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "GitHub",
    icon: "i-simple-icons-github",
    to: "https://github.com/decenzio/nftaa-test",
    target: "_blank",
  },
  {
    icon:
      colorMode.preference === "dark" ? "i-heroicons-sun" : "i-heroicons-moon",
    label: colorMode.preference === "dark" ? "Light Mode" : "Dark Mode",
    onClick: () => {
      colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    },
  },
]);

const walletButtonText = computed(() => {
  if (!isConnected.value) return "Connect";
  if (!selectedAccount.value) return "Node Connected";
  const accountName = selectedAccount.value.meta.name || "Account";
  const shortAddress = `${selectedAccount.value.address.slice(
    0,
    6
  )}...${selectedAccount.value.address.slice(-4)}`;
  return `${accountName} (${shortAddress})`;
});

const walletButtonColor = computed(() => {
  if (!isConnected.value) return "primary";
  if (!selectedAccount.value) return "warning";
  return "success";
});

onMounted(() => {
  if (nodeUrl.value) {
    connectToNode(nodeUrl.value);
  }
});
</script>

<template>
  <div>
    <header
      class="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800"
    >
      <h1 class="text-4xl font-bold">NFTAA Test</h1>

      <div class="flex items-center gap-4">
        <!-- Wallet Connection Button -->
        <ClientOnly>
          <UButton
            :color="walletButtonColor"
            :variant="isConnected && selectedAccount ? 'soft' : 'solid'"
            @click="isWalletModalOpen = true"
            icon="i-heroicons-wallet"
          >
            {{ walletButtonText }}
          </UButton>
        </ClientOnly>
        <UNavigationMenu :items="items" class="justify-center" />
      </div>
    </header>

    <slot />

    <!-- Wallet Connection Modal -->
    <UModal
      v-model:open="isWalletModalOpen"
      title="Wallet Connection"
      :dismissible="false"
    >
      <template #body>
        <WalletConnector @close="isWalletModalOpen = false" />
      </template>
    </UModal>
  </div>
</template>
