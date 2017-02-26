<template>
  <div class="ui error message">
    Unknown JSON-Schema-Type: {{schema.type}}
  </div>
</template>

<script>
  /**
   * Renders the parameter with "in=body"
   */
  export default {
    name: 'JSONUnkownObject',
    props: ['schema'],
    components: { },
    computed: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
