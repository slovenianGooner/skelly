<template>
  <CodeEditor
    :modelValue="value"
    @update:modelValue="$emit('update:modelValue', $event)"
    lang="javascript"
    theme="dracula"
    :options="{ minLines: 10 }"
    @init="init"
  />
</template>
<script>
import CodeEditor from "vue3-code-editor";
import beautify from "js-beautify";

export default {
  props: {
    modelValue: {
      required: true,
    },
    theme: {
      type: String,
      default: "dracula",
    },
    mode: {
      type: String,
      default: "javascript",
    },
  },
  components: {
    CodeEditor,
  },
  data() {
    return {
      value: this.modelValue,
    };
  },
  created() {
    this.value = beautify(this.modelValue);
  },
  methods: {
    init() {
      require("brace/theme/" + this.theme);
      require("brace/mode/" + this.mode);
    },
  },
};
</script>
