<template>
  <div>
    <h4 class="ui header">
      {{parameter.name}}
      <i v-if="parameter.required" class="asterisk icon" title="required"></i>
    </h4>
    <RefInfo :object="parameter"></RefInfo>
    <Marked :md="parameter.description"></Marked>
    <JSONSchema v-if="parameter.schema" :schema="parameter.schema"></JSONSchema>
    <VendorExtensions :object="parameter" :spec="spec"></VendorExtensions>
  </div>
</template>

<script>
  import RefInfo from './RefInfo'
  import VendorExtensions from './VendorExtensions'
  import Marked from './Marked'
  import JSONSchema from './schema/JSONSchema'


  /**
   * Renders the parameter with "in=body"
   */
  export default {
    name: 'BodyParameter',
    props: ['parameter', 'spec'],
    components: { VendorExtensions, RefInfo, Marked, JSONSchema },
    computed: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .parameter.default.value {
    font-style: italic;
  }
  .parameter.default.value > code {
    font-family:     "Courier New", Courier, monospace;
    font-style: normal;
    background-color: #eee;

  }

</style>
