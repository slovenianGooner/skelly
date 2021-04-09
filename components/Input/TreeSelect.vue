<template>
  <div>
    <treeselect
      :options="options"
      v-model="modelValue"
      :normalizer="normalizer"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </div>
</template>
<script>
import Treeselect from "vue3-treeselect";
import "vue3-treeselect/dist/vue3-treeselect.css";

export default {
  components: {
    Treeselect,
  },
  props: {
    modelValue: {
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
      required: true,
    },
    normalizer: {
      type: Function,
    },
  },
};
</script>
<style>
.vue-treeselect__input:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
    var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
    calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
    var(--tw-shadow, 0 0 #0000);
  outline: 2px solid transparent;
  outline-offset: 2px;
}
</style>
