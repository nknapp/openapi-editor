<template>
  <div v-if="pathItem">
    <h2 class="ui header">{{path}}</h2>
    <RefInfo :object="pathItem"></RefInfo>
    <Search :source="missingMethods" showAll="true" placeholder="Add operation (Alt+M)" @choose="addMethod"
            accessKey="m" v-show="missingMethods.length > 0"></Search>

    <Operation v-for="op in operations" :method="op.method" :pointer="op.pointer" :path="path"></Operation>

    <div v-if="pathItem.parameters">
      <h3 class="ui header">Parameters</h3>
      <Parameters :parameters="pathItem.parameters"></Parameters>
    </div>
  </div>
  <div v-else>
    <h2 class="ui header">{{path}}</h2>
    <div class="ui error message">
      Path {{path}} was not found.
      <router-link :to="'/'">
        Back to overview
      </router-link>
    </div>
  </div>
</template>

<script>
  import Operation from './Operation'
  import RefInfo from './RefInfo'
  import Search from './semantic-ui/Search'
  import VendorExtensions from './VendorExtensions'
  import Parameters from './Parameters'
  import pickBy from 'lodash.pickby'


  const validMethods = {
    get: true, post: true, patch: true, put: true, head: true, options: true, 'delete': true
  }

  export default {
    name: 'PathItem',
    props: ['path'],
    components: { Operation, VendorExtensions, RefInfo, Parameters, Search },
    mounted: function () {
      $(this.$el).find('.ui.dropdown').dropdown()
    },
    data: function () {
      return {
        validMethods: validMethods
      }
    },
    methods: {
      addMethod: function (method) {
        this.$store.commit('addOperation', { path: this.path, method: method.key })
      }
    },
    computed: {
      pathItem: function () {
        return this.$store.state.spec.paths[this.path]
      },
      /**
       * Return the http_methods that are not yet defined for this pathitem
       * @returns {Array.<string>|string[]}
       */
      missingMethods: function () {
        return Object.keys(validMethods)
          .filter((method) => !this.pathItem[method])
          .map((method) => {
            return {
              title: method.toUpperCase(),
              key: method
            }
          })
      },
      operations: function () {
        return Object.keys(this.pathItem)
          .filter((method) => validMethods[method])
          .map((method) => ({
              method: method,
              pointer: `#/${encodeURIComponent(this.path)}/${method}`
            })
          )
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
