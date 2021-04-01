<template>
  <div class="flex items-center justify-between">
    <slot name="prefix" />
    <form
      @submit.prevent="submit"
      ref="form"
      class="relative flex flex-grow focus-within:z-10"
    >
      <XInputTextButton
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
    modelValue: {
      required: true,
    },
    searchTitle: {
      type: String,
      default: "Search",
    },
  },
  data() {
    return {
      search: this.modelValue,
    };
  },
  methods: {
    submit() {
      this.$emit("search", this.search);
    },
  },
};
</script>
