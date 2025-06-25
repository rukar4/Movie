<template>
  <form @submit.prevent="search" class="search-form">
    <input
        v-model="searchQuery"
        placeholder="Enter movie title"
        class="search-input"
    />
    <button @click="search" class="button">Search</button>
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
