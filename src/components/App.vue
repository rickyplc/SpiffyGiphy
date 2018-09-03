<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './Header'

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">
  @import "~styles/bootstrap.overrides";
  @import "~styles/app";
</style>
