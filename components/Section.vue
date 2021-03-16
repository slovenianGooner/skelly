<template>
  <div class="bg-white rounded-md shadow-sm divide-y">
    <div class="flex justify-between items-center px-4 py-3 sm:px-6">
      <div class="text-xl font-bold">
        <span v-if="$slots.title">
          <slot name="title" />
        </span>
        <span v-else>{{ title }}</span>
      </div>
      <x-button-form-xs @click="toggle">
        <x-icon-minus v-if="open" />
        <x-icon-plus v-else />
      </x-button-form-xs>
    </div>
    <div v-if="open" class="px-4 py-6 sm:px-6">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      open: !this.collapsed,
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>
