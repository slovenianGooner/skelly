<template>
  <div class="relative">
    <input
      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
      :class="[
        errors.length
          ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-300'
          : '',
        inputClass,
      ]"
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-bind="$attrs"
    />
    <div
      class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      v-if="errors.length"
    >
      <x-icon-exclamation-circle
        size="w-5 h-5"
        class="text-red-500"
        viewBox="0 0 20 20"
      />
    </div>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    inputClass: {
      type: String,
      default: "",
    },
    errors: {
      type: Array | String,
      default: () => [],
    },
    value: {
      required: true,
    },
  },
};
</script>
