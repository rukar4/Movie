<template>
  <form @submit.prevent="search" class="search-form">
    <input
        v-model="searchQuery"
        placeholder="Enter movie title"
        class="search-input"
    />
    <button type="submit" class="button" :disabled="loading">{{ loading ? 'Searching' : 'Search Movies' }}</button>
  </form>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
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
