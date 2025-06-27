<template>
  <form @submit.prevent="search" class="search-form">
    <input
        v-model="searchQuery"
        placeholder="Enter movie title"
        class="search-input"
    />
    <button type="submit" class="button">Search Movies</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    search() {
      this.$emit('search', this.searchQuery)
    }
  }
}
</script>
