<template>
  <div>
    <RefInfo :object="schema" styleClass="ui none"></RefInfo>
    <div class="ui fluid card">
      <div class="content">
        <div class="description">
          <Marked :md="schema.description"></Marked>
        </div>
        <div class="meta">
          <div v-if="minMaxItems" class="minmax">
            {{minMaxItems}}
          </div>
        </div>
        <div class="array-items">
          <JSONSchema :schema="schema.items"></JSONSchema>
        </div>
      </div>

      <VendorExtensions :object="schema"></VendorExtensions>
    </div>


  </div>
</template>

<script>
  import RefInfo from '../RefInfo'
  import VendorExtensions from '../VendorExtensions'
  import Marked from '../Marked'
  import JSONSchema from './JSONSchema'
  import {minMaxItems} from '../../lib/datatypes'
  import {vendor} from '../../lib/vendor'


  /**
   * Renders the parameter with "in=body"
   */
  export default {
    name: 'JSONArray',
    props: ['schema'],
    components: { JSONSchema, VendorExtensions, RefInfo, Marked },
    computed: {
      minMaxItems: function () {
        return minMaxItems(this.schema)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .array-items {
    padding-left: 1em;

    &:before, &:after {
      font-size: 150%;
      font-weight: bold;
      margin-left: -0.75em;
    }

    &:before {
      content:"[";
    }

    &:after {
      content:"]";
    }
  }

</style>
