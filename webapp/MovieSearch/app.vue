<template>
  <div class="page-wrapper">
    <header class="banner">
      <h1 class="title">
        My Movie Search
      </h1>
      <Search @search="fetchMovies" class="search-banner"/>
    </header>
    <div>
      <hr>
      <MovieResults :movies="movies" :query="query"/>
    </div>
    <footer>
      <hr>
      <p class="footer-text">Powered by
        <a href="https://www.themoviedb.org/?language=en-US" target="_blank" rel="noopener noreferrer">TMDB</a>
      </p>
      <p>Made by Reid Merrell</p>
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
      query: ""
    }
  },
  methods: {
    async fetchMovies(searchQuery) {
      try {
        const trimmed = searchQuery.trim()

        if (trimmed.length > 100) {
          alert('Search query is too long. Please limit to 100 characters.')
          return
        }

        const encodedQuery = encodeURIComponent(trimmed)
        const response = await axios.get(`http://localhost:8080/top_movies?search=${encodedQuery}`)

        console.log(encodedQuery)

        this.movies = response.data.results
        this.query = trimmed
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    },
  },
}
</script>

<style>
@import "styles.css";
</style>