<template>
  <div class="rounded-md bg-red-50 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationCircleIcon class="text-red-400 w-5 h-5" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800 mb-2" v-if="title">
          {{ title }}
        </h3>
        <div class="text-sm text-red-700">
          <slot />
        </div>
        <div class="mt-4" v-if="$slots.footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ExclamationCircleIcon } from "@heroicons/vue/solid";

export default {
  components: {
    ExclamationCircleIcon,
  },
  props: {
    title: {
      type: String,
    },
  },
};
</script>
