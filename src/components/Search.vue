<template>
  <div>
    <container v-bind:giff-items="giffItems"/>
    <infinite-loading spinner="bubbles" @infinite="infiniteHandler">
      <span slot="no-more">
        no more :(
      </span>
    </infinite-loading>
  </div>
</template>

<script>
import Container from './Container'
import InfiniteLoading from 'vue-infinite-loading'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      eventState: null,
      offset: 0
    }
  },
  props: ['query'],
  components: {
    Container,
    InfiniteLoading
  },
  computed: {
    ...mapState(['giffItems'])
  },
  watch: {
    '$route' (to, from) {
      if (to.path === '/search') {
        this.$store.dispatch('searchGiffs', {query: to.query.q, offset: this.offset})
      }
    },
    giffItems (newVal) {
      // Increment the offset each time new content is loaded
      this.offset = newVal.length + 10

      if (!this.eventState) return

      if (newVal.length) {
        this.eventState.loaded()
      } else {
        this.eventState.complete()
      }
    }
  },
  methods: {
    infiniteHandler (eventState) {
      this.eventState = eventState
      this.$store.dispatch('searchGiffs', {query: this.query, offset: this.offset})
    }
  }
}
</script>
