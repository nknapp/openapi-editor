<template>
  <table class="ui tablet stacking table">
    <thead>
    <tr>
      <th>Name</th>
      <th>Location</th>
      <th>Type</th>
      <th>Description</th>
      <th>Constraints</th>
      <th>Multiplicity</th>
    </tr>
    </thead>
    <tbody>
      <ParameterObject v-for="parameter in parameters" :parameter="parameter" :spec="spec"></ParameterObject>
    </tbody>
  </table>
</template>

<script>
  import ParameterObject from './ParameterObject'

  /**
   * Displays a table of parameters that are NOT the request body
   */
  export default {
    name: 'Parameters',
    props: ['parameters', 'spec'],
    computed: {
    },
    components: { ParameterObject }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
