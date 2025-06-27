// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: '/Movie/',
    head: {
      title: 'My Movie Search',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A simple movie search application' }
      ],
      link: [
        { rel: 'icon', type: 'image/jpeg', href: '/Movie/default_poster.jpg' }
      ]
    }
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
