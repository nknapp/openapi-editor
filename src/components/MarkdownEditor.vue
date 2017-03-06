<template>
  <div class="ui raised segments" @click="focusInputField">
    <div class="ui segment markdown-preview html">
      <div v-html="htmlPreview">
      </div>
    </div>
    <div class="ui segment markdown-preview markdown">
      <div class="ui transparent fluid input">
        <textarea class="ui fluid input" v-if="rows" :rows="rows" placeholder="Enter markdown here..."
                  v-model="md"
                  @keyup.ctrl.enter="save"></textarea>
        <input v-else type="text" placeholder="Enter markdown here..." :value="markdown" @input="update">
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  import marked from 'marked'
  import Vue from 'vue'

  /**
   * Markdown-Editor with live-preview.
   * Usage:
   *
   * ```
   *   <MarkdownEditor v-model="aBinding" rows="heightInRows" />
   * ```
   *
   * If `rows` is omitted, the input will be displayed as `input[type='text']` instead of `textarea`.
   *
   */
  export default {
    name: 'MarkdownEditor',
    props: ['value', 'rows'],
    data: function () {
      return {
        markdown: this.md,
      }
    },
    computed: {
      htmlPreview: function () {
        return this.markdown ? marked(this.markdown) : '&nbsp;'
      }
    },
    methods: {
      focusInputField: function () {
        var querySelector = this.$el.querySelector('.markdown-preview.markdown input, .markdown-preview.markdown textarea');
        querySelector.focus()
      },
      focus: function () {
        Vue.nextTick(() => this.focusInputField())
        return true
      },
      update: function (event) {
        this.markdown = event.target.value;
        this.$emit('input', this.markdown)
      }
    }
  }
</script>

<style>
  .ui.segment.markdown-preview {
    padding-top: 1.5em;
  }

  .markdown-preview:before {
    position: absolute;
    font-size: 0.75em;
    font-weight: bold;
    color: darkgray;;
    top: 0px;
    left: 0.5rem;
  }

  .markdown-preview.html:before {
    content: 'HTML Preview';
  }

  .markdown-preview.markdown:before {
    content: 'MARKDOWN';
  }

  .markdown-preview.markdown textarea {
    background: transparent;
    border: 0 none;
    width: 100%;
    outline: none;
    height: 100%;
  }

</style>
