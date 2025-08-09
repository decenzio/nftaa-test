import { cryptoWaitReady } from "@polkadot/util-crypto";
export default defineNuxtPlugin(async (nuxtApp) => {
  if (import.meta.server) return;
  await cryptoWaitReady();
});
