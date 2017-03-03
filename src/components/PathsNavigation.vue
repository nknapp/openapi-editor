<template>
  <div class="menu">
    <div class="item">
      <div class="ui action input">
        <input type="text" placeholder="Enter path pattern... (Alt+P)" v-model="newPathName"
               accesskey="p"
               @keyup.enter="addPath">
        <button :disabled="hasErrors" class="ui button" @click="addPath">
          Add
        </button>
      </div>
      <div v-for="error in errors" class="oae-form-error">{{error}}</div>
    </div>
    <div class="item" v-for="(operations,path) in displayedPaths">
      <router-link :to="'/path/' + encodeURIComponent(path)">
        {{path}}
      </router-link>
      <i class="delete icon" @click="removePath(path)"></i>
    </div>
  </div>
</template>

<script>
  import pickBy from 'lodash.pickby'
  import {nonVendor} from '../lib/vendor'
  import router from '../router/index'

  const validators = [
    {
      check: (name, spec) => name.lastIndexOf('/', 0) !== 0,
      message: "Path must start with '/'"
    },
    {
      check: (name, spec) => spec.paths[name],
      message: "Path already exists"
    },
    {
      check: (name, spec) => name.split('/')
          .filter((c) => !c.match(/^(\{[^{}]+\}|[^{}]+|)$/)).length > 0,
      message: 'Path components must be of the form "abc" or "{abc}"'
    }

  ]

  export default {
    name: 'PathsNavigation',
    props: ['paths', 'filter'],
    components: {},
    data: function () {
      // Name of the path to be created (bound to the input field)
      return {
        newPathName: ""
      }
    },
    computed: {
      /**
       * Check all validators and return the error message for found errors
       */
      errors: function () {
        if (!this.newPathName) {
          return []
        }
        return validators
          .filter((validator) => validator.check(this.newPathName, this.$store.state.spec))
          .map((validator) => validator.message)
      },

      hasErrors: function () {
        return this.newPathName && this.errors.length > 0
      },
      /**
       * Compute non-vendor-extensions apply path filter (if set)
       * @returns {Object}
       */
      displayedPaths: function () {
        var result = nonVendor(this.$store.state.spec.paths)
        if (!this.filter) {
          return result
        }
        return pickBy(result, (value, key) => key.indexOf(this.filter) >= 0)
      }
    },
    methods: {
      addPath: function () {
        if (!this.hasErrors) {
          this.$store.commit('addPath', this.newPathName)
          router.push('/path/' + encodeURIComponent(this.newPathName))
          this.newPathName = ""
        }
      },
      removePath: function (path) {
        this.$store.commit('deletePath', path)
        var route = '/path/' + encodeURIComponent(path)
        if (this.$route.path === route) {
          router.push('/')
        }
        console.log(route,this.$route)
      }
    }
  }


</script>

<style scoped>
  .oae-form-error {
    padding: 0.25rem;
    color: lightcoral;
  }
</style>
