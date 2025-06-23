<template>
  <h1 id="app" class="title">
    My Movie Search
  </h1>
  <div id="app" class="center-container">
    <Search @search="fetchMovies" />
  </div>
  <div id="app">
    <MovieResults :movies="movies" />
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
    };
  },
  methods: {
    async fetchMovies(searchQuery) {
      try {
        // TODO: SANITIZE searchQuery
        const response = await axios.get(`http://localhost:8080/movie?search=${searchQuery}`)
        this.movies = response.data.results
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    },
  },
}
</script>

<style>
@import "styles.css";
body {
  margin: 0;
  height: 100vh;
  background: linear-gradient(to bottom, #420057, #000000);
  color: white;
}
</style>