<template>
  <div class="ui two column grid">
    <div class="row">
      <div class="sixteen wide column">
        <h2 class="ui header">
          <div class="content">
            {{info.title}}
            <div class="sub header">version {{info.version}}</div>
          </div>
        </h2>
        <div v-if="info.description" class="item">
          <div class="content">
            <Marked :md="info.description"></Marked>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="sixteen wide column">
        <div class="ui two stackable cards">
          <LegalInfo :spec="spec"></LegalInfo>
          <AccessInfo :spec="spec"></AccessInfo>
          <VendorExtensions :object="spec" label="/"></VendorExtensions>
          <VendorExtensions :object="spec.paths" label="/paths"></VendorExtensions>
          <VendorExtensions :object="info" label="/info"></VendorExtensions>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Marked from './Marked'
  import VendorExtensions from './VendorExtensions'
  import LegalInfo from './LegalInfo'
  import AccessInfo from './AccessInfo'

  export default {
    name: 'InfoObject',
    props: ['spec'],
    computed: {
      info: function () {
        return this.spec.info
      }
    },
    components: { Marked, VendorExtensions, LegalInfo, AccessInfo }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
