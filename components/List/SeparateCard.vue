<template>
  <div>
    <div v-if="$slots.header || $scopedSlots.header" class="mb-3">
      <slot name="header" />
    </div>
    <div v-if="data.length">
      <ul class="space-y-3">
        <li
          v-for="(item, index) in data"
          :key="index"
          class="bg-white shadow overflow-hidden rounded-md px-6 py-4"
        >
          <slot :item="item" :index="index" />
        </li>
      </ul>
    </div>
    <div
      v-else-if="empty"
      class="p-8 flex items-center justify-center text-gray-700 bg-white shadow overflow-hidden rounded-md"
    >
      <span v-if="$slots.empty">
        <slot name="empty" />
      </span>
      <span v-else>{{ empty }}</span>
    </div>
    <div v-if="$slots.footer || $scopedSlots.footer" class="mt-3">
      <slot name="footer" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    empty: {
      type: Boolean | String,
      default: "No items yet.",
    },
  },
};
</script>
