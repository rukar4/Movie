<template>
  <h3 class="center-container">Search Results</h3>
  <div class="center-container">
    <div class="card-grid">
      <MovieCard v-for="movie in movies"
                 :key="movie.id"
                 :title="movie.title"
                 :rating="movie.popularity_summary"
                 :poster-path="movie.poster_image_url"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  movies: Array, // Pass the array of movies as a prop
})
</script>

<style>
@import "../styles.css";
</style>