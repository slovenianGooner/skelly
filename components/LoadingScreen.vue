<template>
  <transition
    enter-active-class="transition-opacity ease-linear duration-200"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity ease-linear duration-200"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="modelValue"
      v-bind="$attrs"
      class="w-full h-screen fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700 bg-opacity-90 dark:bg-opacity-90 z-20 text-red-500"
    >
      <XSpinnerIcon />
    </div>
  </transition>
</template>
<script>
import { XSpinnerIcon } from "sg-skelly";

export default {
  components: {
    XSpinnerIcon,
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
