// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'http://localhost:8080'
    }
  },
  app: {
    baseURL: '/Movie/',
  },
  devtools: { enabled: false }
})
