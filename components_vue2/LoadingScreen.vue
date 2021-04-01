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
      v-show="value"
      v-bind="$attrs"
      class="w-full h-screen fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90 z-20 text-red-500"
    >
      <x-icon-spinner />
    </div>
  </transition>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
