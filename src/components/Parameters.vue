<template>
  <div>
    <div class="ui two cards">
      <ParameterObject v-for="(param, index) in parameters" :pointer="parameterPath(index)">
        <i icon="remove icon link" @click="removeParameter(index)"></i>
      </ParameterObject>
      <div class="ui link card" @click="addParameter">
        <div class="content">
          <div class="header">
            <i class="large plus icon link"></i> add parameter
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import ParameterObject from './ParameterObject'
  import ParameterEditor from './ParameterEditor'
  import Modal from './semantic-ui/Modal'
  import {resolveRef} from '../lib/ref'
  /**
   * Displays a table of parameters that are NOT the request body
   */
  export default {
    name: 'Parameters',
    props: {
      pointer: {
        type: String,
        required: true
      }
    },
    data: function () {
      return {
        params: this.value || [],
        editedParameter: null,
        editedIndex: null
      }
    }
    ,
    computed: {
      parameters: function () {
        return resolveRef(this.$store.state.spec, this.pointer)
      }
    }
    ,
    methods: {
      parameterPath: function (index) {
        return `${this.pointer}/${index}`
      },
      addParameter: function () {
        this.$store.commit('addParameter', { pointer: this.pointer })
      },
      removeParameter: function (index) {
        this.$store.commit('removeParameter', { pointer: this.pointer, index })
      },

      cancelEditor: function () {
        this.editedParameter = null
      },
      save: function () {
        if (this.editedIndex === null) {
          this.params.push(this.editedParameter)
        } else {
          this.params[this.editedIndex] = this.editedParameter
        }
        this.editedParameter = null
        this.editedIndex = null;
        this.$emit('input', this.params)
      }
    }
    ,
    components: {
      ParameterObject, ParameterEditor, Modal
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
