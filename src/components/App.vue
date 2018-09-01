<template>
  <div id="app">
    <Header/>
    <router-view/>
    <Container/>
  </div>
</template>

<script>
  import Header from "./Header"
  import Container from "./Container"

  export default {
    components: {
      Header,
      Container
    }
  }
</script>

<style lang="scss">
  @import "~styles/bootstrap.overrides";
  @import "~styles/app";
</style>
