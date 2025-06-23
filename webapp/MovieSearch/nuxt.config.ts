// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL || 'http://localhost:3000',
      TMDB_API_KEY: process.env.TMDB_API_KEY,
      TMDB_API_TOKEN: process.env.TMDB_API_TOKEN
    }
  }
})
