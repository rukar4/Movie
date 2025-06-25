<script setup>
defineProps({
  title: String,
  rating: Number,
  posterPath: String,
  movieId: Number
})

const emit = defineEmits(['select'])

function onClick() {
  emit('select', movieId)
}
</script>

<template>
  <div class="poster-container" @click="onClick">
    <img :src="posterPath" alt="Movie Poster" class="poster">
    <div class="hover-info">
      <div class="hover-content">
        <img :src="posterPath" alt="Movie Poster" style="width: 60%; height: auto; border-radius: 4px;">
        <h4 class="hover-title">{{ title }}</h4>
        <p class="hover-text">TMDB Popularity Score</p>
        <p class="hover-text">{{ rating }} / 10</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../styles.css";
</style>