<template>
  <div class="flex items-center justify-between">
    <slot name="prefix" />
    <form
      @submit.prevent="submit"
      ref="form"
      class="relative flex flex-grow focus-within:z-10"
    >
      <x-input-text-button
        v-model="search"
        :button="searchTitle"
        :placeholder="placeholder"
        class="flex-1"
        type="submit"
      />
    </form>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "Search here...",
    },
    value: {
      required: true,
    },
    searchTitle: {
      type: String,
      default: "Search",
    },
  },
  data() {
    return {
      search: this.value,
    };
  },
  methods: {
    submit() {
      this.$emit("submit", this.search);
    },
  },
};
</script>
