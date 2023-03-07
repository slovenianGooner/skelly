<template>
  <div class="prose">
    <ckeditor
      :editor="classicEditor"
      v-model="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :config="config"
    ></ckeditor>
  </div>
</template>
<script>
import wysiwygMixin from "../../mixins/wysiwyg";
export default {
  mixins: [wysiwygMixin],
  props: {
    modelValue: {
      required: true,
    },
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>
