<template>
  <form class="ui form">
    <div class="two fields">
      <div class="field">
        <label>Name</label>
        <input class="ui input" type="text" v-model="model.name" @input="update">
      </div>
      <div class="field">
        <label>in</label>
        <Dropdown :choices="choices.locations"
                  placeholder="located in..."
                  :valueFn="(loc) => loc && loc.value"
                  v-model="model.location"
                  name="location"
                  @input="update">
          <template scope="props">{{props.choice.title}} ({{props.choice.value}})</template>
        </Dropdown>
      </div>
    </div>
    <div class="field">
      <label>Description</label>
      <MarkdownEditor v-model="model.description" @input="update" rows="3"></MarkdownEditor>
    </div>
    <h4 class="ui header">Flags</h4>
    <div class="three fields">
      <div class="field">
        <Checkbox type="toggle" name="required" v-model="model.required" @input="update">
          Required
        </Checkbox>
      </div>
      <div class="field">
        <Checkbox type="toggle" name="allowEmptyValue" v-model="model.allowEmptyValue" @input="update">
          Allow empty value
        </Checkbox>
      </div>
      <div class="field">
        <Checkbox type="toggle" name="deprecated" v-model="model.deprecated" @input="update">
          Deprecated
        </Checkbox>
      </div>
    </div>
  </form>
</template>

<script>
  import Vue from 'vue'
  import RefInfo from './RefInfo'
  import VendorExtensions from './VendorExtensions'
  import MarkdownEditor from './MarkdownEditor'
  import Search from './semantic-ui/Search'
  import Dropdown from './semantic-ui/Dropdown'
  import Checkbox from './semantic-ui/Checkbox'
  import {constraints, minMaxItems, dataTypes, dataTypeByValue, dataTypeForParam} from '../lib/datatypes'

  export default {
    name: 'ParameterEditor',
    props: ['value', 'edit'],
    components: { VendorExtensions, RefInfo, Search, MarkdownEditor, Dropdown, Checkbox },
    data: function () {
      var locations = [
        { value: 'query', title: 'Query-string' },
        { value: 'header', title: 'Request-headers' },
        { value: 'path', title: 'Path' },
        { value: 'cookie', title: 'Cookies' },
      ]

      return {
        choices: {
          dataTypes,
          locations
        },
        // Model for editing everythign
        model: {
          name: this.value.name,
          location: locations.filter((loc) => {
            return loc.value === this.value.in
          })[0],
          description: this.value.description,
          dataType: this.value.dataType && dataTypeForParam(this.value.dataType),
          required: false,
          deprecated: false,
          allowEmptyValue: false
        },
      }
    },
    methods: {
      update: function () {
        this.$emit('input', {
          name: this.model.name,
          in: this.model.location && this.model.location.value,
          required: this.model.required,
          deprecated: this.model.deprecated,
          description: this.model.description,
          allowEmptyValue: this.model.allowEmptyValue
        })

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
    font-family: "Courier New", Courier, monospace;
    font-style: normal;
    background-color: #eee;

  }

</style>
