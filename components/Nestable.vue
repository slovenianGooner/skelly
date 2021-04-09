<template>
  <ol ref="sortableList">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="nestable-item-draggable"
    >
      <slot :item="item" :toggle="toggle" />
      <div
        v-if="item.children && item.children.length > 0 && item.isOpen"
        :class="[indentClass]"
        class="mt-2"
      >
        <XNestable
          :items="item.children"
          @sort="$emit('sort', $event)"
          :level="level + 1"
          class="space-y-2"
        >
          <template #default="{ item, toggle }">
            <slot :item="item" :toggle="toggle" />
          </template>
        </XNestable>
      </div>
    </li>
  </ol>
</template>
<script>
import Sortable from "sortablejs";

export default {
  name: "XNestable",
  props: {
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
      indents: ["pl-0", "pl-4", "pl-8", "pl-12", "pl-16"],
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
  mounted() {
    if (this.$refs.sortableList !== undefined) {
      Sortable.create(this.$refs.sortableList, {
        animation: 300,
        handle: ".nestable-handle",
        draggable: ".nestable-item-draggable",
        ghostClass: ".nestable-ghost-class",
        onSort: (e) => {
          this.$emit("sort", e);
        },
      });
    }
  },
};
</script>
