<template>
  <label
    class="block text-sm font-medium"
    :class="{
      'text-gray-700 dark:text-gray-300': errors.length === 0,
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
      type: [Array, String],
      default: () => {
        return [];
      },
    },
  },
};
</script>
