<template>
  <span v-html="html">{{ html }}</span>
</template>

<script>
  import marked from 'marked'
  export default {
    name: 'Marked',
    props: ['md'],
    computed: {
      html: function () {
        return this.md && marked(this.md)
      }
    }
  }
</script>
