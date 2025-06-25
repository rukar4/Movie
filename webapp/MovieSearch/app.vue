<template>
  <h1 id="app" class="title">
    My Movie Search
  </h1>
  <div id="app" class="center-container">
    <Search @search="fetchMovies" />
  </div>
  <div id="app">
    <MovieResults :movies="movies" :query="query"/>
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
        // TODO: SANITIZE searchQuery
        const response = await axios.get(`http://localhost:8080/movie?search=${searchQuery}`)
        this.movies = response.data.results
        this.query = searchQuery
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