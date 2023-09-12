<template>
  <Multiselect
    v-model="value"
    @update:modelValue="$emit('update:modelValue', $event)"
    :options="options"
    mode="tags"
    :searchable="true"
    :createTag="createTag"
    :placeholder="placeholder"
    :showOptions="!!options.length"
    :limit="limit"
    :max-height="maxHeight"
  />
</template>
<script>
import Multiselect from "@vueform/multiselect";

export default {
  data() {
    return {
      value: this.modelValue,
    };
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      required: true,
    },
    limit: {
      type: Number,
      default: null,
    },
    placeholder: {
      type: String,
      default: null
    },
    createTag: {
      type: Boolean,
      default: true,
    },
    maxHeight: {
        type: Number,
        required: false,
        default: 160,
      },
  },
  components: {
    Multiselect,
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.multiselect-tag {
  background: rgba(220, 38, 38, var(--tw-bg-opacity)) !important;
}
.multiselect-tag i::before {
  color: #fff !important;
}
</style>
