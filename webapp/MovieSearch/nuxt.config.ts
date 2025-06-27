// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: '/Movie/'
  },
  nitro: {
    preset: 'static'
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL
    }
  },
  devtools: { enabled: false }
})
