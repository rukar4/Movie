<template>
  <div>
    <input v-model="searchQuery" placeholder="Enter movie title" />
    <button @click="search">Search</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    search() {
      this.$emit('search', this.searchQuery);
    },
  },
};
</script>

<style>
</style>