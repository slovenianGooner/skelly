<template>
  <ol ref="sortableList">
    <li
      v-for="(item, index) in transformedItems"
      :key="index"
      class="nestable-item-draggable"
    >
      <slot :item="item" :toggle="toggle" />
      <div
        v-if="
          item[childrenResolver] &&
          item[childrenResolver].length > 0 &&
          item.isOpen
        "
        :class="[indentClass]"
        class="mt-2"
      >
        <XNestable
          :items="item[childrenResolver]"
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
import treeMixin from "../mixins/tree";

export default {
  name: "XNestable",
  mixins: [treeMixin],
  props: {
    activeResolver: {
      type: Function,
      default: null,
    },
    level: {
      type: Number,
      default: 0,
    },
    childrenResolver: {
      type: String,
      default: "children",
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
      transformedItems: [],
    };
  },
  created() {
    if (typeof this.activeResolver === "function") {
      this.transformedItems = this.transformAncestors(
        this.items,
        this.activeResolver,
        "id",
        false
      );
    } else {
      this.transformedItems = this.items;
    }
  },
  computed: {
    nextLevel() {
      return this.level + 1;
    },
    indentClass() {
      //return this.indents[this.nextLevel];
      return this.indents[1];
    },
  },
  methods: {
    toggle(item) {
      item.isOpen = !item.isOpen;
    },
    resolveValue(item) {
      return item.id;
    },
  },
  mounted() {
    if (this.$refs.sortableList !== undefined) {
      Sortable.create(this.$refs.sortableList, {
        animation: 300,
        handle: ".nestable-handle",
        draggable: ".nestable-item-draggable",
        ghostClass: ".nestable-ghost-class",
      });
    }
  },
};
</script>
