<template>
  <div class="page-wrapper">
    <header class="banner">
      <h1 class="title">
        My Movie Search
      </h1>
      <Search @search="fetchMovies" :loading="loading" class="search-banner"/>
    </header>
    <div v-if="loading" class="loading">
      <div class="spinner"/>
      <p v-if="showServerStartupMessage">Waking up the server — this may take a minute.</p>
    </div>
    <div v-else style="padding-top: min(1px, 0.1vh);">
      <hr>
      <MovieResults :movies="movies" :query="query"/>
    </div>
    <footer>
      <hr>
      <p>Made by
        <a href="https://www.linkedin.com/in/reid-merrell-ai-graphics-developer/" target="_blank" rel="noopener noreferrer">Reid Merrell</a>
      </p>
      <p>Powered by
        <a href="https://www.themoviedb.org/?language=en-US" target="_blank" rel="noopener noreferrer">TMDB</a>
        and
        <a href="https://render.com/" target="_blank" rel="noopener noreferrer">Render</a>
      </p>
      <p>Visit my portfolio
        <a href="https://rukar4.github.io/" target="_blank" rel="noopener noreferrer">here</a>
      </p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
import Search from '@/components/Search.vue'
import MovieResults from '@/components/MovieResults.vue'

export default {
  name: 'App',
  components: {
    Search,
    MovieResults,
  },
  data() {
    return {
      movies: [],
      query: "",
      loading: false,
      showServerStartupMessage: false
    }
  },
  methods: {
    async fetchMovies(searchQuery) {
      let timeoutId = null

      this.loading = true
      this.showServerStartupMessage = false

      timeoutId = setTimeout(() => {
        this.showServerStartupMessage = true
      }, 2500)

      try {
        const trimmed = searchQuery.trim()

        if (trimmed.length > 100 || trimmed.length === 0) {
          alert('Please enter a valid movie title (1-100 characters).')
          this.loading = false
          return
        }

        const encodedQuery = encodeURIComponent(trimmed)
        const response = await axios.get(`${this.$config.public.apiUrl}/top_movies?search=${encodedQuery}`)

        this.movies = response.data.results
        this.query = trimmed
      } catch (error) {
        alert('Error fetching movies. Please try again later.')
        console.error('Error fetching movies:', error)
      } finally {
        this.loading = false
        clearTimeout(timeoutId)
        this.showServerStartupMessage = false
      }
    },
  },
}
</script>

<style>
@import "styles.css";
</style>