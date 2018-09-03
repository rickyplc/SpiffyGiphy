<template>
  <container v-bind:giff-items="giffItems"/>
</template>

<script>
import Container from './Container'
import { mapState } from 'vuex'

export default {
  components: {
    Container
  },
  props: ['query'],
  computed: {
    ...mapState(['giffItems'])
  },
  created () {
    this.$store.dispatch('searchGiffs', this.query)
  }
}
</script>
