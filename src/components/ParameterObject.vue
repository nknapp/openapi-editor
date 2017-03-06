<template>
  <div v-if="editing" class="ui fluid card">
    <div class="content">
      <slot></slot>
      <ParameterEditor v-model="model"></ParameterEditor>
    </div>
    <div class="ui bottom attached buttons">
      <button class="ui button" name="cancelButton" @click="cancel">Cancel</button>
      <div class="or"></div>
      <button class="ui positive button" name="saveButton" @click="save">Save</button>
    </div>
  </div>
  <div v-else class="ui fluid card">
    <div class="content">
      <div class="header" @click="edit">{{model.name}}
        <slot></slot>
      </div>
      <div class="meta">
        in {{model.in}}
      </div>
      <div class="description">
        <Marked :md="model.description" :readOnly="true"></Marked>
      </div>
      <div class="extra-content">
        <div v-if="model.required" class="ui basic blue label">
          <i class="asterisk icon"></i> required
        </div>
        <div v-if="model.deprecated" class="ui basic orange label">
          <i class="warning circle icon"></i> deprecated
        </div>
        <div v-if="model.allowEmptyValue" class="ui basic green label">
          <i class="checkmark box icon"></i> allow empty value
        </div>

      </div>
    </div>
    <button class="ui bottom attached button" name="editButton" @click="edit">
      <i class="edit icon"></i> Edit
    </button>
  </div>
</template>

<script>
  import RefInfo from './RefInfo'
  import VendorExtensions from './VendorExtensions'
  import Marked from './Marked'
  import ParameterEditor from './ParameterEditor'
  import {constraints, minMaxItems, multiplicity} from '../lib/datatypes'
  import {resolveRef} from '../lib/ref'
  import Vue from 'vue'

  export default {
    name: 'ParameterObject',
    props: ['pointer'],
    components: { VendorExtensions, RefInfo, Marked, ParameterEditor },
    data: function () {
      return {
        model: resolveRef(this.$store.state.spec, this.pointer) || {

        },
        editing: false
      }
    },
    methods: {
      edit: function () {
        this.$data.editing = true;
        return true
      },
      save: function () {
        this.$data.editing = false;
        console.log('save')
        this.$store.commit('saveParameter', { pointer: this.pointer, value: this.$data.model })
        return true
      },
      cancel: function () {
        this.$data.editing = false;
        return true
      }

    },
    computed: {}
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
