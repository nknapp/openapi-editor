<template>
  <div class="ui card">
    <div class="content">
      <div class="ui relaxed list">
        <div class="item">
          <div class="content">
            <div class="header">Schemes</div>
            <div>{{spec.schemes ? spec.schemes.join(', ') : 'No schemes defined'}}</div>
          </div>
        </div>
        <div class="item">
          <div class="content">
            <div class="header">Host</div>
            <div>{{spec.host}}</div>
          </div>
        </div>
        <div class="item">
          <div class="content">
            <div class="header">Base-Path</div>
            <div>{{spec.basePath}}</div>
          </div>
        </div>
        <div class="item">
          <div class="content">
            <div class="header">Input mime-types</div>
            <div>{{spec.consumes ? spec.consumes.join(', ') : 'No input mime-types defined'}}</div>
          </div>
        </div>
        <div class="item">
          <div class="content">
            <div class="header">Output mime-types</div>
            <div>{{spec.produces ? spec.produces.join(', ') : 'No output mime-types defined'}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Marked from './Marked'
  import VendorExtensions from './VendorExtensions'
  import LegalInfo from './LegalInfo'

  export default {
    name: 'AccessInfo',
    props: ['spec'],
    computed: {
      info: function () {
        return this.spec.info
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
