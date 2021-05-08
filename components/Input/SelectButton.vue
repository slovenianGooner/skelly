<template>
  <div class="flex rounded-md shadow-sm w-full">
    <XInputSelect
      input-class="rounded-r-none"
      class="flex items-stretch flex-grow focus-within:z-10"
      v-model="modelValue"
      :options="options"
    />
    <XButtonForm
      @click="$emit('click', $event)"
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
  },
};
</script>
