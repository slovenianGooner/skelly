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
import { wysiwygMixin } from "sg-skelly";
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
  data() {
    return {
      value: this.modelValue
    }
  },
  watch: {
    value: () => {
      this.$emit('update:modelValue', this.value)
    }
  },
};
</script>
