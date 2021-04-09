<template>
  <Multiselect
    v-model="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :options="options"
    mode="tags"
    :searchable="true"
    :createTag="true"
  />
</template>
<script>
import Multiselect from "@vueform/multiselect";

export default {
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      required: true,
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
