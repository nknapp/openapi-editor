<template>
  <div class="json-schema">
    <div class="">{{schema.type}} <span v-if="schema.format">({{schema.format}})</span></div>
    <component :is="delegate" :schema="schema"></component>
  </div>
</template>

<script>
  import Marked from '../Marked'
  /**
   * Dispatcher for different JSON-Schema-Types
   */
  export default {
    name: 'JSONSchema',
    props: ['schema'],
    components: { Marked },
    computed: {
      delegate: function () {
        return component(this.schema.type)
      }
    }
  }

  function component(type) {
    if (!type) {
      return require('./JSONObject')
    }
    switch (type) {
      case 'object':
        return require('./JSONObject')
      case 'string':
      case 'integer':
        return require('./JSONPrimitive')
      case 'array':
        return require('./JSONArray')
      default:
        return require('./JSONUnknownObject')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .json-schema > .description {
  }
</style>
