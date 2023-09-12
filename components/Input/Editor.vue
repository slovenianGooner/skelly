<template>
  <div class="prose">
    <ckeditor
      :editor="classicEditor"
      v-model="value"
      @update:modelValue="$emit('update:modelValue', $event)"
      :config="config"
    ></ckeditor>
  </div>
</template>
<script>
import wysiwygMixin from "../../mixins/wysiwyg";
export default {
  mixins: [wysiwygMixin],
  data() {
    return {
      value: this.modelValue,
    };
  },
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
