<template>
  <div>
    <h2 class="ui header">{{path}}</h2>
    <Operation v-for="(operation, method) in operations" :path="path" :method="method" :operation="operation"></Operation>
    <VendorExtensions :object="spec.paths[path]"></VendorExtensions>
  </div>
</template>

<script>
  import Operation from './Operation'
  import VendorExtensions from './VendorExtensions'
  import pickBy from 'lodash.pickby'

  const validMethods = {
    get: true, post: true, patch:true, put:true, head:true, options:true, delete:true
  }

  export default {
    name: 'PathItem',
    props: [ 'path', 'spec' ],
    components: { Operation, VendorExtensions },
    computed: {
      operations: function() {
        return pickBy(this.spec.paths[this.path], (value, key) => validMethods[key])
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
