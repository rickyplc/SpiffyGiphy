<template>
<b-navbar toggleable="md" type="dark" variant="info">
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
  <b-navbar-brand href="/">Spiffy-Giphy</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-form>
        <b-form-input v-model="query" size="sm" class="mr-sm-2" type="text" autocomplete="off" placeholder="Search"/>
        <b-button v-on:click="search" size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
</template>

<script>
export default {
  data () {
    return {
      query: null
    }
  },
  methods: {
    search: function () {
      // Only run a search if the user enters a query
      if (!this.query) return

      this.$router.push({path: '/search', query: {q: this.query}})
      this.$store.dispatch('searchGiffs', this.query)
      // Clear search box
      this.query = null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import "~styles/header";
</style>
