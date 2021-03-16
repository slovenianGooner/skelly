<template>
  <label
    class="block text-sm font-medium"
    :class="{
      'text-gray-700': errors.length === 0,
      'text-red-600': errors.length > 0,
    }"
  >
    <slot />
  </label>
</template>
<script>
export default {
  props: {
    errors: {
      type: Array | String,
      default: () => [],
    },
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>
