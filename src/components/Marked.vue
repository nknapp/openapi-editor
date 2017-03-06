<template>
  <div v-if="md && !editing">
    <i class="right floated edit icon" @click="edit"></i>
    <div v-html="html"></div>
  </div>
  <MarkdownEditor v-else-if="editing" v-model="markdown" :rows="rows">
    <div class="ui segment">
      <div type="submit" class="ui compact primary button" @click="save">Save</div>
      <div type="submit" class="ui compact cancel button" @click="cancel">Cancel</div>
    </div>
  </MarkdownEditor>
  <div v-else-if="emptyMessage && !md">
    <a @click="edit"><i class="plus icon"></i> {{emptyMessage}}</a>
  </div>
</template>

<script>
  import marked from 'marked'
  import MarkdownEditor from './MarkdownEditor'
  import Vue from 'vue'
  export default {
    name: 'Marked',
    props: ['md', 'emptyMessage', 'rows'],
    data: function () {
      return {
        markdown: this.md,
        editing: false
      }
    },
    components: { MarkdownEditor },
    computed: {
      html: function () {
        return this.md && marked(this.md)
      }
    },
    methods: {
      focusInputField: function () {
        var querySelector = this.$el.querySelector('.markdown-preview.markdown input, .markdown-preview.markdown textarea');
        querySelector.focus()
      },
      edit: function () {
        this.editing = true
        Vue.nextTick(() => this.focusInputField())
        return true
      },
      save: function () {
        this.editing = false
        this.$emit('save', this.markdown)
        return true
      },
      cancel: function () {
        this.editing = false
        this.markdown = this.md
        return true
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
