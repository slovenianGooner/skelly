<template>
  <div class="relative flex-1">
    <select
      class="appearance-none block w-full px-3 py-2 bg-white dark:bg-gray-700 dark:border-gray-500 dark:text-gray-300 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
      :class="[
        errors.length
          ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-300'
          : '',
        inputClass,
      ]"
      v-model="modelValue"
      v-bind="$attrs"
    >
      <option
        v-if="empty && empty.title"
        :value="empty.value"
        v-html="empty.title"
      ></option>
      <option
        :value="resolveValue(item, index)"
        v-for="(item, index) in options"
        :key="index"
      >
        {{ resolveLabel(item) }}
      </option>
    </select>
    <div
      class="absolute inset-y-0 right-0 pr-8 flex items-center pointer-events-none"
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
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    inputClass: {
      type: String,
      default: "",
    },
    errors: {
      type: [Array, String],
      default: () => [],
    },
    empty: {
      type: Object,
      default: () => {
        return {
          value: null,
          title: "&mdash;",
        };
      },
    },
    modelValue: {
      required: true,
    },
    labelResolver: {
      default: null,
    },
    valueResolver: {
      default: null,
    },
  },
  methods: {
    resolveValue(item, index) {
      if (typeof this.valueResolver === "function") {
        return this.valueResolver(item);
      }

      if (this.valueResolver) {
        return item[this.valueResolver];
      }

      return item;
    },
    resolveLabel(item) {
      if (typeof this.labelResolver === "function") {
        return this.labelResolver(item);
      }

      if (this.labelResolver) {
        return item[this.labelResolver];
      }

      return item;
    },
  },
};
</script>
