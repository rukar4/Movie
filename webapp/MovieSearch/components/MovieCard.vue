<script setup>
const props = defineProps({
  title: String,
  rating: Number,
  posterPath: String,
  movieId: Number
})

const emit = defineEmits(['select'])

function onClick() {
  emit('select', props.movieId)
}
</script>

<template>
  <div class="poster-container" @click="onClick">
    <img v-if="posterPath" :src="posterPath" alt="Movie Poster" class="poster">
    <img v-else src="../res/default_poster.jpg" alt="Poster" class="poster" style="object-fit: contain">

    <div class="hover-info">
      <div class="hover-content">
        <img v-if="posterPath" :src="posterPath" alt="Movie Poster" class="mini-poster">
        <img v-else src="../res/default_poster.jpg" alt="Poster" class="mini-poster" style="object-fit: contain">

        <h4 class="hover-title">{{ title }}</h4>

        <p class="hover-text">TMDB Popularity Score</p>
        <p class="hover-text">{{ rating }} / 10</p>
      </div>
    </div>
  </div>
</template>
