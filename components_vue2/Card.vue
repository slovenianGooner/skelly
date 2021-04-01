<template>
  <div
    class="bg-white shadow rounded-lg divide-y divide-gray-200"
    :class="[overflows ? 'overflow-hidden' : '']"
  >
    <div class="px-4 py-5 sm:px-6" v-if="$slots.header || title">
      <slot name="header">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {{ title }}
        </h3>
      </slot>
    </div>
    <div :class="[bodyClass]">
      <slot />
    </div>
    <div class="px-4 py-4 sm:px-6" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
    overflows: {
      type: Boolean,
      default: true,
    },
    bodyClass: {
      type: String,
      default: "px-4 py-5 sm:px-6",
    },
  },
};
</script>
