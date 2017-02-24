<template>

</template>

<script>
  export default {
    name: 'Paths',
    computed: {
      filteredPaths: function () {
        return this.paths
      }
    },
    props: ['paths', 'search']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
