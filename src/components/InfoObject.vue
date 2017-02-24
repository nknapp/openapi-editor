<template>
  <div class="info-object">
    <h2 class="ui header">
      <i class="settings icon"></i>
      <div class="content">
        {{info.title}}
        <div class="sub header">version {{info.version}}</div>
      </div>
    </h2>
    <div class="ui celled list">
      <div v-if="info.description" class="item">
        <div class="content">
          <Marked :md="info.description"></Marked>
        </div>
      </div>
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
                {{info.contact.email}}
              </div>
            </div>
            <div v-if="info.contact.url" class="item">
              <i class="ui world icon"></i>
              <div class="content">
                <a :href="info.contact.url" class="item">
                  {{info.contact.url}}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="ui horizontal divided list">
          <div class="item">
            <div class="content">
              <div class="header">Schemes</div>
              <div>{{spec.schemes ? spec.schemes.join(', ') : 'No schemes defined'}}</div>
            </div>
          </div>
          <div class="item">
            <div class="content">
              <div class="header"></div>
              <div>://</div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Marked from './Marked'

  export default {
    name: 'InfoObject',
    props: ['spec'],
    computed: {
      info: function () {
        return this.spec.info
      },
      schemes: function () {
        if (!this.spec.schemes) {
          return []
        }
        return this.spec.schemes.map((scheme) => `${scheme}://`)
      }
    },
    components: { Marked },
    mounted () {
      $(this.$el).find('.dropdown').dropdown()
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
