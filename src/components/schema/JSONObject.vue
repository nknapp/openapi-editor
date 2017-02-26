<template>
  <div v-if="schema">
    <RefInfo :object="schema"></RefInfo>
    <div class="object-properties">
      <table class="ui compact table">
        <tbody>
        <tr v-for="property in properties" class="top aligned">
          <td class="collapsing">{{property.name}}:</td>
          <td class="propertySchema">
            <JSONSchema :schema="property.schema"></JSONSchema>
          </td>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <VendorExtensions :object="schema"></VendorExtensions>
  </div>
</template>

<script>
  import RefInfo from '../RefInfo'
  import VendorExtensions from '../VendorExtensions'
  import Marked from '../Marked'
  import JSONSchema from './JSONSchema'


  /**
   * Renders the parameter with "in=body"
   */
  export default {
    name: 'JSONObject',
    props: ['schema'],
    components: { VendorExtensions, RefInfo, Marked, JSONSchema },
    computed: {
      properties: function () {
        if (!this.schema || !this.schema.properties) {
          return []
        }
        return Object.keys(this.schema.properties)
          .sort()
          .map((property) => {
            return {
              name: property,
              schema: this.schema.properties[property],
              required: this.schema.required && this.schema.required.indexOf(property) >= 0
            }
          })

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .ui.table {
    margin-top: 0px;
  }
  .object-properties {
    padding-left: 1em;

    &:before, &:after {
      font-size: 150%;
      font-weight: bold;
      margin-left: -0.75em;
    }

    &:before {
      content:"{";
    }

    &:after {
      content:"}";
    }
  }

  .propertySchema {
    font-size: 100%;
    padding-left: 1em;
  }

</style>
