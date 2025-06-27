<template>
  <div v-if="loading" class="dark-overlay">
    <div class="spinner"/>
  </div>
  <div v-if="movies.length > 0">
    <h2>Top TMDB Results for "{{ query }}"</h2>
    <div class="card-grid">
      <MovieCard v-for="movie in movies"
                 :movieId="movie.movie_id"
                 :title="movie.title"
                 :rating="movie.popularity_summary"
                 :poster-path="movie.poster_image_url"
                 @select="fetchMovieDetails"
      />
    </div>
  </div>
  <div v-else>
    <h2>No results found for "{{ query }}"</h2>
  </div>

  <MovieDetails v-if="selectedMovie" :movie="selectedMovie" @close="selectedMovie = null"/>

</template>

<script setup>
import axios from "axios";
import MovieDetails from "~/components/MovieDetails.vue";

const config = useRuntimeConfig()

defineProps({
  movies: Array,
  query: String
})

const selectedMovie = ref(null)
const loading = ref(false)

async function fetchMovieDetails(movieId) {
  loading.value = true
  try {
    const response = await axios.get(`${config.public.apiUrl}/movie/${movieId}`)
    selectedMovie.value = response.data
  } catch (error) {
    alert('Error fetching movie details. Please try again later.')
    console.error('Error fetching movie details:', error)
  }
  loading.value = false
}
</script>

<style scoped>
h2 {
  padding-left: clamp(1rem, 10vw, 4rem);
}

@media (max-width: 768px) {
  h2 {
    text-align: center;
    padding: 0;
  }
}
</style>