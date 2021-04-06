<template>
  <div class="prose">
    <ckeditor
      :editor="classicEditor"
      v-model="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :config="{}"
    ></ckeditor>
  </div>
</template>
<script>
import ckeditor from "@ckeditor/ckeditor5-vue";
import classicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  components: {
    ckeditor: ckeditor.component,
  },
  data() {
    return {
      classicEditor: classicEditor,
    };
  },
  props: {
    modelValue: {
      required: true,
    },
    init: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>
