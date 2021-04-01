<template>
  <div v-if="open">
    <slot />
    <slot name="clear" v-if="activeFilters().length">
      <XButtonForm @click="$emit('clear', queryWithoutFilters())">
        {{ clear }}
      </XButtonForm>
    </slot>
  </div>
</template>
<script>
import omit from "lodash/omit";
export default {
  props: {
    clear: {
      type: String,
      default: "Clear filters",
    },
    filters: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      open: false,
    };
  },
  created() {
    this.open = this.activeFilters().length > 0;
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    activeFilters() {
      return this.filters.filter((filter) => {
        return (
          this.query()[filter] !== undefined &&
          this.query()[filter] !== null &&
          this.query()[filter] !== ""
        );
      });
    },
    queryWithoutFilters() {
      return omit({ ...this.query() }, this.filters);
    },
  },
};
</script>
