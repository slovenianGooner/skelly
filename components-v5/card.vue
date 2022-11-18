<script setup lang="ts">
const props = defineProps({
    title: {type: String, required: true},
    overflows: {type: Boolean, default: true, required: false},
    bodyClass: {type: String, default: "px-4 py-5 sm:px-6", required: false},
});
</script>

<template>
  <div
    class="bg-white dark:bg-gray-700 dark:border dark:border-gray-500 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-500"
    :class="[overflows ? 'overflow-hidden' : '']"
  >
    <div class="px-4 py-5 sm:px-6" v-if="$slots.header || title">
      <slot name="header">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-300">
          {{ title }}
        </h3>
      </slot>
    </div>
    <div :class="[bodyClass]">
      <slot/>
    </div>
    <div class="px-4 py-4 sm:px-6" v-if="$slots.footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<style scoped>

</style>
