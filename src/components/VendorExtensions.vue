<template>
  <div class="ui fluid card" v-if="show">
    <div class="content">
      <div class="header">Vendor extensions <span v-if="label">({{label}})</span></div>
      <div class="ui relaxed list">
        <div v-for="(extension, key) in extensions" class="item">
          <div class="content">
            <div class="header">{{key}}</div>
            {{extension}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { vendor } from '../lib/vendor'

  export default {
    name: 'VendorExtensions',
    props: ['object', 'label'],
    computed: {
      extensions: function () {
        return vendor(this.object)
      },
      show: function () {
        return Object.keys(this.extensions).length > 0
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
