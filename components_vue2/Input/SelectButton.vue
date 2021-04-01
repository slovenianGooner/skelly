<template>
  <div class="flex rounded-md shadow-sm">
    <x-input-select
      input-class="rounded-r-none"
      class="flex items-stretch flex-grow focus-within:z-10"
      :value="value"
      :options="options"
      @input="$emit('input', $event)"
    />
    <x-button-form-md
      @click="$emit('click', $event)"
      no-ring
      class="-ml-px rounded-l-none rounded-r-md"
    >
      <span v-if="$slots.button">
        <slot name="button" />
      </span>
      <span v-else>{{ button }}</span>
    </x-button-form-md>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    errors: {
      type: Array | String,
      default: () => [],
    },
    value: {
      required: true,
    },
    button: {
      type: String,
    },
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>
