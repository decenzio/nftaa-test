import { ApiPromise, WsProvider } from "@polkadot/api";
import type { SubmittableExtrinsic } from "@polkadot/api/types";
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { Keyring } from "@polkadot/keyring";
import type { ISubmittableResult } from "@polkadot/types/types";

import "~~/shared/types/chain/augment-api";
import "~~/shared/types/chain/augment-types";

import {} from "~~/shared/types/chain/augment-types";

// sr25519 keyring
const keyring = new Keyring({ type: "sr25519" });

// Admin account seeds for development
const ADMIN_SEEDS = [
  "//Alice",
  "//Bob",
  "//Charlie",
  "//Dave",
  "//Eve",
  "//Ferdie",
];

// Create admin accounts dynamically using keyring
const ADMIN_ACCOUNTS = ADMIN_SEEDS.map((seed) => {
  const pair = keyring.createFromUri(seed);
  const name = seed.replace("//", "");
  return {
    address: pair.address,
    meta: { name: `${name} (Admin)`, source: "admin" },
    type: "sr25519",
  } as InjectedAccountWithMeta;
});

// Helper function to get admin account seeds
const getAdminSeed = (address: string): string | null => {
  const adminAccount = ADMIN_ACCOUNTS.find((acc) => acc.address === address);
  if (adminAccount) {
    const name = adminAccount.meta.name?.replace(" (Admin)", "") || "";
    return `//${name}`;
  }
  return null;
};

const nodeUrl = useState<string>(
  "polkadot.nodeUrl",
  () => "ws://127.0.0.1:9920"
);
const api = ref<ApiPromise | null>(null);
const selectedAccount = useState<InjectedAccountWithMeta | null>(
  "polkadot.selectedAccount",
  () => null
);
const isConnected = ref(false);
const isConnecting = ref(false);
const accounts = ref<InjectedAccountWithMeta[]>([]);

export const usePolkadot = () => {
  // Always include admin accounts
  const allAccounts = computed(() => {
    return [...ADMIN_ACCOUNTS, ...accounts.value];
  });

  // Load values from localStorage on initialization
  onMounted(() => {
    const savedAccountAddress = localStorage.getItem("nftaa-selected-account");
    if (savedAccountAddress && allAccounts.value.length > 0) {
      const savedAccount = allAccounts.value.find(
        (acc) => acc.address === savedAccountAddress
      );
      if (savedAccount) {
        selectedAccount.value = savedAccount;
      }
    }
    // Node URL
    const savedUrl = localStorage.getItem("nftaa-node-url");
    if (savedUrl) {
      nodeUrl.value = savedUrl;
    }
  });

  // Watch for account changes and save to localStorage
  watch(selectedAccount, (newAccount) => {
    if (newAccount) {
      localStorage.setItem("nftaa-selected-account", newAccount.address);
    } else {
      localStorage.removeItem("nftaa-selected-account");
    }
  });

  // Watch for savedUrl changes
  watchDebounced(
    nodeUrl,
    (newUrl) => {
      localStorage.setItem("nftaa-node-url", newUrl);
    },
    {
      debounce: 1000,
    }
  );

  const connectToNode = async (nodeUrl = "ws://127.0.0.1:9920") => {
    try {
      isConnecting.value = true;
      const wsProvider = new WsProvider(nodeUrl);

      api.value = await ApiPromise.create({
        provider: wsProvider,
      });

      isConnected.value = true;
      console.log(`Connected to node: ${nodeUrl}`);
    } catch (error) {
      console.error("Failed to connect to node:", error);
      throw error;
    } finally {
      isConnecting.value = false;
    }
  };

  const connectWallet = async () => {
    try {
      // Enable polkadot extension
      const extensions = await web3Enable("NFTAA Test");
      if (extensions.length === 0) {
        // If no extension, user can still use admin accounts
        console.log("No extension found, admin accounts available");
      } else {
        // Get accounts from extension
        accounts.value = await web3Accounts();
      }

      // Try to restore previously selected account from all available accounts
      const savedAccountAddress = localStorage.getItem(
        "nftaa-selected-account"
      );
      if (savedAccountAddress) {
        const savedAccount = allAccounts.value.find(
          (acc) => acc.address === savedAccountAddress
        );
        if (savedAccount) {
          selectedAccount.value = savedAccount;
        } else {
          // Fallback to first admin account if saved account not found
          selectedAccount.value = allAccounts
            .value[0] as InjectedAccountWithMeta;
        }
      } else {
        // No saved account, use first available account (admin or extension)
        selectedAccount.value = allAccounts.value[0] as InjectedAccountWithMeta;
      }

      return allAccounts.value;
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    }
  };

  const signAndSend = async (
    tx: SubmittableExtrinsic<"promise">,
    successCallback?: (result: ISubmittableResult) => void
  ) => {
    if (!selectedAccount.value || !api.value) {
      throw new Error("No account or API connection");
    }

    const toast = useToast();
    let statusToastId: string | number | null = null;

    try {
      // Check if it's an admin account
      const isAdminAccount = selectedAccount.value.meta.source === "admin";

      // Show initial signing toast
      const toastResult = toast.add({
        title: "Transaction Status",
        description: isAdminAccount
          ? "Signing with admin account..."
          : "Waiting for signature...",
        color: "info",
        duration: 0, // Non-closable (never auto-closes)
        close: false, // Hide close button
        icon: "i-lucide-clock",
      });
      statusToastId = toastResult.id;

      // Helper function to handle transaction results
      const handleTransactionResult = (result: ISubmittableResult) => {
        if (result.status.isReady) {
          // Update toast when transaction is ready/submitted
          if (statusToastId) {
            toast.update(statusToastId, {
              title: "Transaction Status",
              description: "Transaction submitted to network...",
              color: "info",
              duration: 0,
              close: false,
              icon: "i-lucide-send",
            });
          }
        } else if (result.status.isInBlock) {
          console.log(`Transaction in block: ${result.status.asInBlock}`);

          // Update toast for in-block status
          if (statusToastId) {
            toast.update(statusToastId, {
              title: "Transaction Status",
              description:
                "Transaction included in block, awaiting finalization...",
              color: "warning",
              duration: 0,
              close: false,
              icon: "i-lucide-package",
            });
          }
          if (successCallback) {
            successCallback(result);
          }
        } else if (result.status.isFinalized) {
          console.log(`Transaction finalized: ${result.status.asFinalized}`);

          // Remove status toast and let success toast be shown by component
          if (statusToastId) {
            toast.update(statusToastId, {
              title: "Transaction Status",
              description: "Transaction finalized!",
              color: "success",
              duration: 2000,
              close: true,
              icon: "i-lucide-package-check",
            });
          }
          return result;
        } else if (result.isError) {
          console.error("Transaction error:", result);

          // Remove status toast
          if (statusToastId) {
            toast.remove(statusToastId);
          }

          throw result;
        }
      };

      return new Promise(async (resolve, reject) => {
        if (isAdminAccount) {
          // Use keyring for admin accounts
          const keyring = new Keyring({ type: "sr25519" });
          const adminSeed = getAdminSeed(selectedAccount.value!.address);
          if (!adminSeed) {
            throw new Error("Unknown admin account");
          }
          const adminPair = keyring.addFromUri(adminSeed);

          // For admin accounts, pass the KeyringPair directly
          tx.signAndSend(adminPair, (result) => {
            try {
              const txResult = handleTransactionResult(result);
              if (txResult) {
                resolve(txResult);
              }
            } catch (error) {
              reject(error);
            }
          }).catch((error: any) => {
            if (statusToastId) {
              toast.remove(statusToastId);
            }
            reject(error);
          });
        } else {
          // Use extension for regular accounts
          try {
            const injector = await web3FromAddress(
              selectedAccount.value!.address
            );
            tx.signAndSend(
              selectedAccount.value!.address,
              { signer: injector.signer },
              (result) => {
                try {
                  const txResult = handleTransactionResult(result);
                  if (txResult) {
                    resolve(txResult);
                  }
                } catch (error) {
                  reject(error);
                }
              }
            ).catch((error: any) => {
              if (statusToastId) {
                toast.remove(statusToastId);
              }
              reject(error);
            });
          } catch (error) {
            if (statusToastId) {
              toast.remove(statusToastId);
            }
            reject(error);
          }
        }
      });
    } catch (error) {
      // Remove status toast on error
      if (statusToastId) {
        toast.remove(statusToastId);
      }
      throw error;
    }
  };

  const disconnectNode = async () => {
    try {
      if (api.value) {
        await api.value.disconnect();
      }
      api.value = null;
      isConnected.value = false;
      // Reset account info when disconnecting
      accounts.value = [];
      selectedAccount.value = null;
      console.log("Disconnected from node");
    } catch (error) {
      console.error("Failed to disconnect from node:", error);
      throw error;
    }
  };

  return {
    api: readonly(api),
    accounts: readonly(allAccounts),
    selectedAccount,
    nodeUrl,
    isConnected: readonly(isConnected),
    isConnecting: readonly(isConnecting),
    connectToNode,
    disconnectNode,
    connectWallet,
    signAndSend,
  };
};
