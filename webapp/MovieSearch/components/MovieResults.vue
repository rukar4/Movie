<template>
  <h3 class="center-container">Search Results</h3>
  <div class="center-container">
    <ul>
      <li v-for="movie in movies" :key="movie.id" class="list-item">
        <strong>{{ movie.title }}</strong>
        <br>
        <span class="tab">Rating: {{ movie.popularity_summary }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    movies: Array, // Pass the array of movies as a prop
  },
};
</script>

<style>
</style>