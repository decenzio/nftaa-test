<template>
  <div class="space-y-4">
    <!-- Node URL Input -->
    <div class="space-y-2">
      <div class="flex justify-between items-center">
        <span class="flex gap-2 items-center">
          <label class="text-sm font-medium">Node URL:</label>
          <UInput
            v-model="nodeUrl"
            placeholder="ws://127.0.0.1:9920"
            :disabled="isConnected"
          />
        </span>

        <!-- Status -->
        <div class="text-sm">
          <UBadge :color="statusColor" variant="soft">
            {{ statusText }}
          </UBadge>
        </div>
      </div>
      <p class="text-xs text-gray-500">
        {{
          isConnected
            ? "Disconnect to change URL"
            : "Enter WebSocket URL of the Substrate node"
        }}
      </p>
    </div>

    <!-- Node Connection -->
    <div>
      <UButton
        :loading="isConnecting"
        :disabled="isConnected"
        @click="handleConnectNode"
        variant="outline"
        block
      >
        {{ isConnected ? "Connected to Node" : "Connect to Node" }}
      </UButton>

      <!-- Disconnect Button -->
      <UButton
        v-if="isConnected"
        @click="handleDisconnectNode"
        color="error"
        variant="outline"
        size="sm"
        class="mt-2"
        block
      >
        Disconnect Node
      </UButton>
    </div>

    <!-- Wallet Connection -->
    <div v-if="isConnected">
      <UButton
        v-if="!selectedAccount"
        @click="handleConnectWallet"
        color="primary"
        block
      >
        Load Accounts
      </UButton>

      <!-- Account Selection -->
      <div v-else class="space-y-2">
        <label class="text-sm font-medium">Selected Account:</label>
        <USelect
          v-model="selectedAccountAddress"
          :items="accountOptions"
          class="w-full"
          @update:model-value="handleAccountChange"
        />
        <p class="text-xs text-gray-500">
          {{ formatAddress(selectedAccountAddress) }}
        </p>
        <div class="flex items-center gap-2 text-xs text-gray-500">
          <UIcon
            :name="
              selectedAccount?.meta.source === 'admin'
                ? 'i-heroicons-key'
                : 'i-heroicons-wallet'
            "
            class="w-4 h-4"
          />
          <span>
            {{ accounts.length }} account(s) available ({{ adminCount }} admin,
            {{ extensionCount }} extension)
          </span>
        </div>
      </div>
    </div>
    <UButton class="cursor-pointer" block @click="$emit('close')">
      Save and Close
    </UButton>
  </div>
</template>

<script setup lang="ts">
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

defineEmits<{
  close: boolean;
}>();

const {
  isConnected,
  isConnecting,
  accounts,
  selectedAccount,
  connectToNode,
  disconnectNode,
  connectWallet,
  nodeUrl,
} = usePolkadot();

const toast = useToast();

const handleConnectNode = async () => {
  try {
    await connectToNode(nodeUrl.value);
    toast.add({
      title: "Success",
      description: `Connected to node: ${nodeUrl.value}`,
      color: "success",
    });
  } catch (error) {
    toast.add({
      title: "Connection Error",
      description:
        "Failed to connect to node. Check URL and ensure node is running.",
      color: "error",
    });
  }
};

const handleDisconnectNode = async () => {
  try {
    await disconnectNode();
    toast.add({
      title: "Disconnected",
      description: "Disconnected from node",
      color: "info",
    });
  } catch (error) {
    toast.add({
      title: "Disconnect Error",
      description: "Failed to disconnect from node.",
      color: "error",
    });
  }
};

const handleConnectWallet = async () => {
  try {
    await connectWallet();
    toast.add({
      title: "Success",
      description: "Wallet connected",
      color: "success",
    });
  } catch (error) {
    toast.add({
      title: "Wallet Error",
      description: "Failed to connect wallet. Install Polkadot.js extension.",
      color: "error",
    });
  }
};

const handleAccountChange = () => {
  // Optional: emit connected event when account changes to update navbar
  // This allows real-time updates in the navbar when user switches accounts
  toast.add({
    title: "Account Changed",
    description: `Switched to ${
      selectedAccount.value?.meta.name || "selected account"
    }`,
    color: "info",
  });
};

const accountOptions = computed(() => {
  return accounts.value.map((account: InjectedAccountWithMeta) => ({
    label: `${account.meta.name || "Account"} ${
      account.meta.source === "admin" ? "🔑" : "🔗"
    } (${formatAddress(account.address)})`,
    value: account.address,
  }));
});

const adminCount = computed(() => {
  return accounts.value.filter((acc) => acc.meta.source === "admin").length;
});

const extensionCount = computed(() => {
  return accounts.value.filter((acc) => acc.meta.source !== "admin").length;
});

const selectedAccountAddress = computed({
  get: () => selectedAccount.value?.address || "",
  set: (address: string) => {
    selectedAccount.value =
      accounts.value.find((acc) => acc.address === address) || null;
  },
});

const statusColor = computed(() => {
  if (!isConnected.value) return "error";
  if (!selectedAccount.value) return "warning";
  return "success";
});

const statusText = computed(() => {
  if (!isConnected.value) return "Not connected";
  if (!selectedAccount.value) return "Node connected, no wallet";
  return "Ready";
});
</script>
