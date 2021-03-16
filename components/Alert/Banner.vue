<template>
  <div :class="[color]" class="w-full">
    <div
      class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8 relative"
      :class="[bannerClass]"
    >
      <div class="pr-16 sm:text-center sm:px-16">
        <p class="font-medium" :class="[textColor]">
          <slot />
          <span class="block sm:ml-2 sm:inline-block" v-if="$slots.link">
            <slot name="link" />
          </span>
        </p>
      </div>
      <div
        v-if="dismissable"
        class="absolute inset-y-0 right-0 pt-1 pr-1 flex items-start sm:pt-1 sm:pr-2 sm:items-start"
      >
        <button
          type="button"
          @click="$emit('dismiss')"
          class="flex p-2 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <span class="sr-only">Dismiss</span>
          <x-icon-x class="text-white" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: "bg-red-600",
    },
    textColor: {
      type: String,
      default: "text-white",
    },
    bannerClass: {},
    dismissable: {
      type: Boolean,
    },
  },
};
</script>
