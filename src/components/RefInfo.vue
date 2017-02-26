<template>
  <div v-if="object.$ref" :class="styleClass || 'ui info message'">
    Resolved reference: '{{object.$ref}}'
  </div>
</template>

<script>
  /**
   * Shows the target-location of a reference (in addition to the usual resolved information)
   */
  export default {
    name: 'RefInfo',
    props: ['object', 'styleClass']
  }
</script>
