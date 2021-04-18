<template>
  <ul class="border-t border-gray-200 divide-y divide-gray-200">
    <li v-for="(item, index) in items" :key="index">
      <div :class="[indentClass]" class="hover:bg-gray-50 py-2">
        <slot :item="item" :toggle="toggle" />
      </div>
      <div
        v-if="
          item[childrenResolver] &&
          item[childrenResolver].length > 0 &&
          item.isOpen
        "
      >
        <XTreeSelectOptions :items="item.children" :level="level + 1">
          <template #default="{ item, toggle }">
            <slot :item="item" :toggle="toggle" />
          </template>
        </XTreeSelectOptions>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: "XTreeSelectOptions",
  props: {
    childrenResolver: {
      type: String,
      default: "children",
    },
    level: {
      type: Number,
      default: 0,
    },
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      indents: ["pl-0", "pl-2", "pl-4", "pl-6", "pl-8", "pl-10", "pl-12"],
    };
  },
  computed: {
    nextLevel() {
      return this.level + 1;
    },
    indentClass() {
      return this.indents[this.nextLevel];
    },
  },
  methods: {
    toggle(item) {
      item.isOpen = !item.isOpen;
    },
  },
};
</script>
