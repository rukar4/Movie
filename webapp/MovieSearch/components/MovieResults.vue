<template>
  <div v-if="movies.length > 0">
    <h2>Top TMDB Results for "{{ query }}"</h2>
    <div class="card-grid">
      <MovieCard v-for="movie in movies"
                 :movieId="movie.movie_id"
                 :title="movie.title"
                 :rating="movie.popularity_summary"
                 :poster-path="movie.poster_image_url"
      />
    </div>
  </div>
  <div v-else>
    <h2>No results found for "{{ query }}"</h2>
  </div>
</template>

<script setup>
defineProps({
  movies: Array,
  query: String
})
</script>
