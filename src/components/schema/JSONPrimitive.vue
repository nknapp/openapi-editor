<template>
  <div>
    <div v-if="displayAsCard" class="ui fluid card">
      <div class="content">
        <div v-if="this.schema.description" class="description">
          <Marked :md="this.schema.description"></Marked>
        </div>
        <div class="meta">
        <span v-for="constraint in constraints" class="constraint">
          {{constraint}}
        </span>
        </div>
      </div>
      <RefInfo :object="schema" styleClass="ui none"></RefInfo>

      <VendorExtensions :object="schema"></VendorExtensions>
    </div>
  </div>
</template>

<script>
  import RefInfo from '../RefInfo'
  import VendorExtensions from '../VendorExtensions'
  import Marked from '../Marked'
  import JSONSchema from './JSONSchema'
  import {constraints} from '../../lib/datatypes'
  import {vendor} from '../../lib/vendor'

  /**
   * Renders the parameter with "in=body"
   */
  export default {
    name: 'JSONPrimitive',
    props: ['schema'],
    components: { VendorExtensions, RefInfo, Marked, JSONSchema },
    computed: {
      constraints: function () {
        return constraints(this.schema)
      },
      /**
       * Display this definition as a .ui.card if there is more to shaw
       * than just the data-type
       * @returns {boolean|*}
       */
      displayAsCard: function () {
        return this.constraints.length > 0
          || this.description
          || Object.keys(vendor(this.schema)).length > 0
          || this.schema.$ref
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
