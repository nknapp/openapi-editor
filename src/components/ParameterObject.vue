<template>
  <tr class="top aligned">
    <td class="collapsing">
      {{parameter.name}}
      <i v-if="parameter.required" class="asterisk icon" title="required"></i>
    </td>
    <td>{{parameter.in}}</td>
    <td class="single line">
      <div>{{resolvedType}}</div>
    </td>
    <td>
      <Marked :md="parameter.description"></Marked>
      <span class="parameter default value" v-if="parameter.default">(default value: <code>{{JSON.stringify(parameter.default)}}</code>)</span>
    </td>
    <td>
      <div class="ui list">
        <a target="_blank" href="https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#dataTypeFormat" v-if="parameter.format">{{parameter.format}}</a>
        <div class="item" v-for="c in constraints">
          {{c}}
        </div>
      </div>
    </td>
    <td>
      <div v-if="parameter.collectionFormat">{{multiplicity}}</div>
      <div v-if="minMaxItems">({{minMaxItems}})</div>
    </td>
  </tr>
</template>

<script>
  import RefInfo from './RefInfo'
  import VendorExtensions from './VendorExtensions'
  import Marked from './Marked'
  import { constraints, minMaxItems } from '../lib/datatypes'

  export default {
    name: 'ParameterObject',
    props: ['parameter', 'spec'],
    components: { VendorExtensions, RefInfo, Marked },
    computed: {
      styleClass: function () {
        return this.parameter.required ? 'ui red raised card' : 'ui card'
      },
      constraints: function () {
        return constraints(this.parameter)
      },
      resolvedType: function () {
        var p = this.parameter;
        if (p.type === 'array') {
          return p.items + '[]'
        }
        return p.type
      },
      multiplicity: function () {
        if (!this.parameter.collectionFormat) {
          return
        }
        var name = 'p';
        switch (this.parameter.collectionFormat) {
          case 'csv': return `${name}=x1,x2,x3`
          case 'ssv': return `${name}=x1 x2 x3`
          case 'tsv': return `${name}=x1\\tx2\\tx3`
          case 'pipes': return `${name}=x1|x2|x3`
          case 'multi': return `${name}=x1&${name}=v2`
          default: return `Unknown collection-format ${this.parameter.collectionFormat}`
        }
      },
      minMaxItems: function () {
        return minMaxItems(this.parameter)
      }
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
