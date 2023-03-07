<template>
  <div class="flex rounded-md shadow-sm w-full">
    <XInputText
      input-class="rounded-r-none"
      class="flex items-stretch flex-grow focus-within:z-10 text-sm"
      v-model="value"
      v-bind="omit($attrs, 'type')"
    />

    <XButtonForm
      @click="$emit('buttonClick', $event)"
      :type="$attrs.type ? $attrs.type : 'button'"
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
import { omit } from "lodash-es";
import { XButtonForm, XInputText } from "sg-skelly";
export default {
  components: {
    XButtonForm,
    XInputText,
  },
  inheritAttrs: false,
  props: {
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
  data() {
    return {
      omit: omit,
      value: this.modelValue
    };
  },
  watch: {
    value() {
      this.$emit('update:modelValue', this.value)
    }
  },
  methods: {
    handleInput(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>
