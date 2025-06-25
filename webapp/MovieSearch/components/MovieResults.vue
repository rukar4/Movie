<template>
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

defineProps({
  movies: Array,
  query: String
})

const selectedMovie = ref(null)

async function fetchMovieDetails(movieId) {
  try {
    const response = await axios.get(`http://localhost:8080/movie/${movieId}`)
    console.log(response.data)

    selectedMovie.value = response.data
  } catch (error) {
    console.error('Error fetching movie details:', error)
  }
}

</script>
