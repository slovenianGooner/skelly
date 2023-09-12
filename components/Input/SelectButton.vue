<template>
  <div class="flex rounded-md shadow-sm w-full">
    <XInputSelect
      input-class="rounded-r-none"
      class="flex items-stretch flex-grow focus-within:z-10"
      v-model="value"
      @update:modelValue="$emit('update:modelValue', $event)"
      :options="options"
      :labelResolver="labelResolver"
      :valueResolver="valueResolver"
    />
    <XButtonForm
      @click="$emit('buttonClick', $event)"
      no-ring
      class="-ml-px rounded-l-none rounded-r-md"
    >
      <span v-if="$slots.button">
        <slot name="button" />
      </span>
      <span v-else>{{ button }}</span>
    </XButtonForm>
  </div>
</template>
<script>
import XInputSelect from "./Select";
import XButtonForm from "../Button/Form";

export default {
  components: {
    XInputSelect,
    XButtonForm,
  },
  inheritAttrs: false,
  data() {
    return {
      value: this.modelValue,
    };
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    errors: {
      type: [Array, String],
      default: () => [],
    },
    modelValue: {
      required: true,
    },
    button: {
      type: String,
    },
    labelResolver: {
      default: null,
    },
    valueResolver: {
      default: null,
    },
  },
};
</script>
