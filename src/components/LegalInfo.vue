<template>
  <div class="ui card">
    <div class="content">
      <div class="ui relaxed list">
        <div v-if="info.termsOfService" class="item">
          <div class="content">
            <div class="header">Terms of Service</div>
            <a :href="info.termsOfservice">{{info.termsOfService}}</a>
          </div>
        </div>
        <div v-if="info.license" class="item">
          <div class="content">
            <div class="header">License</div>
            <a :href="info.license.url">{{info.license.name}}</a>
          </div>
        </div>
        <div v-if="info.contact" class="item">
          <div class="content">
            <div class="header">Contact</div>
            <div class="ui list">
              <div v-if="info.contact.name" class="item">
                <i class="ui user icon"></i>
                <div class="content">
                  {{info.contact.name}}
                </div>
              </div>
              <div class="item">
                <i class="ui mail icon"></i>
                <div v-if="info.contact.email" class="content">
                  <a :href="info.contact.url">
                    {{info.contact.email}}
                  </a>
                </div>
              </div>
              <div v-if="info.contact.url" class="item">
                <i class="ui world icon"></i>
                <div class="content">
                  <a :href="info.contact.url">
                    {{info.contact.url}}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Marked from './Marked'
  import VendorExtensions from './VendorExtensions'

  export default {
    name: 'LegalInfo',
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
