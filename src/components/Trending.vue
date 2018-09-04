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
  components: {
    Container,
    InfiniteLoading
  },
  computed: {
    ...mapState(['giffItems'])
  },
  watch: {
    giffItems (newVal) {
      // Increment the offset each time new content is loaded
      this.offset += 10

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
      this.$store.dispatch('fetchGiffs', this.offset)
    }
  }
}
</script>
