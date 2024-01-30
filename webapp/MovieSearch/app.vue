<template>
  <div id="app">
    <Search @search="fetchMovies" />
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
        const response = await axios.get(`http://localhost:8080/movie?search=${searchQuery}`)
        this.movies = response.data.results
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    },
  },
};
</script>

<style>
</style>