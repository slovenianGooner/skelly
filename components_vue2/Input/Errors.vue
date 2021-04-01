<template>
  <p class="mt-2 text-sm text-red-600" v-if="parseErrors().length">
    {{ parseErrors()[0] }}
  </p>
</template>
<script>
export default {
  props: {
    errors: {
      type: Array | String,
      default: () => [],
      required: true,
    },
  },
  methods: {
    parseErrors() {
      if (this.errors instanceof Array) {
        return this.errors;
      }

      return [this.errors];
    },
  },
};
</script>
