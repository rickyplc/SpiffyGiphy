<template>
  <b-container>
    <b-row>
     <giff v-for="(item, key) in giffItems" v-bind:key="key" v-bind:image-url="item.url" v-bind:image-title="item.title"/>
    </b-row>
  </b-container>
</template>

<script>
import Giff from './Giff'

export default {
  components: {
    Giff
  },
  props: ['giffItems']
}
</script>
