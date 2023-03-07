<template>
  <div class="relative flex-1">
    <input
      class="dark:bg-gray-700 dark:border-gray-500 dark:text-gray-300 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
      :class="[
        errors.length
          ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-300'
          : '',
        inputClass,
      ]"
      v-model="value"
      v-bind="$attrs"
    />
    <div
      class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      v-if="errors.length"
    >
      <ExclamationCircleIcon class="w-5 h-5 text-red-500" />
    </div>
  </div>
</template>
<script>
import { ExclamationCircleIcon } from "@heroicons/vue/24/solid";
export default {
  components: {
    ExclamationCircleIcon,
  },
  inheritAttrs: false,
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
  props: {
    inputClass: {
      type: String,
      default: "",
    },
    errors: {
      type: [Array, String],
      default: () => [],
    },
    modelValue: {
      required: true,
    },
  },
};
</script>
