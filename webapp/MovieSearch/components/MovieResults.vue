<template>
  <div>
    <h2>Movie Results</h2>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        {{ movie.title }} - {{ movie.popularity_summary }}
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

<style scoped>
</style>