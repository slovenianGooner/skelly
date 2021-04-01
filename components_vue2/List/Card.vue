<template>
  <div
    class="bg-white shadow overflow-hidden rounded-md divide-y divide-gray-200"
  >
    <div v-if="$slots.header || $scopedSlots.header">
      <slot name="header" />
    </div>
    <slot name="body" :data="data">
      <div v-if="data.length">
        <ul class="divide-y divide-gray-200">
          <li v-for="(item, index) in data" :key="index">
            <slot :item="item" :index="index" />
          </li>
        </ul>
      </div>
      <div
        v-else-if="empty"
        class="p-8 flex items-center justify-center text-gray-700"
      >
        <span v-if="$slots.empty">
          <slot name="empty" />
        </span>
        <span v-else>{{ empty }}</span>
      </div>
    </slot>
    <div v-if="$slots.footer || $scopedSlots.footer">
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
