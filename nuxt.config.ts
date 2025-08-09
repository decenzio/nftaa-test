// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/color-mode", "@vueuse/nuxt"],
  css: ["~/assets/css/main.css"],
  ssr: false,
});