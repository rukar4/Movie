<script setup>
const props = defineProps({
  movie: Object,
})

</script>

<template>
  <div class="details-overlay">
    <div class="details-card"
         :style="movie.backdrop_image_url ? `background-image: url(${movie.backdrop_image_url})` : ''">
      <div class="details-info" :style="movie.backdrop_image_url ? 'background-color: rgba(0, 0, 0, 0.85);' : ''">
        <button class="close-button" @click="$emit('close')">✖</button>
        <img v-if="movie.poster_image_url" :src="movie.poster_image_url" alt="Movie Poster" class="details-poster">
        <div>
          <h2>{{ movie.title }}</h2>
          <p><strong>Overview: </strong>{{ movie.overview }}</p>
          <p><strong>Release Date: </strong> {{ movie.release_date }}</p>
          <p><strong>Runtime: </strong> {{ movie.runtime_hours ? `${movie.runtime_hours}h` : '' }} {{ movie.runtime_minutes }}m</p>
          <p><strong>Rating: </strong> {{ movie.popularity_summary }} / 10</p>
          <p><strong>Genres: </strong> {{ movie.genres.join(', ') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.details-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.details-card {
  width: 60%;
  height: 60%;
  min-height: 300px;
  background-color: #420057;
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  border-radius: 10px;
  align-content: center;
  display: flex;
  position: relative;
  overflow: hidden;
}

.details-info {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
  height: 100%;
  overflow: auto;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 2rem;
  box-sizing: border-box;
}

.details-poster {
  height: 60%;
  width: auto;
  max-width: 30%;
  border-radius: 8px;
  object-fit: cover;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>