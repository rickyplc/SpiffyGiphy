<template>
  <b-col md="6" lg="4">
    <div class="thumbnail">
      <b-img v-bind:src="imageUrl" fluid-grow v-bind:alt="imageTitle" />
    </div>
  </b-col>
</template>

<script>
export default {
  props: ['imageUrl', 'imageTitle']
}
</script>

<style lang="scss">
  @import "~styles/giff";
</style>
