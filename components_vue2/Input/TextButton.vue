<template>
  <div class="flex rounded-md shadow-sm">
    <x-input-text
      input-class="rounded-r-none"
      class="flex items-stretch flex-grow focus-within:z-10 text-sm"
      :value="value"
      v-bind="omit($attrs, 'type')"
      @input="$emit('input', $event)"
    />
    <x-button-form-md
      @click="$emit('click', $event)"
      :type="$attrs.type ? $attrs.type : 'button'"
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
import omit from "lodash/omit";
export default {
  inheritAttrs: false,
  props: {
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
  data() {
    return {
      omit: omit,
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>
