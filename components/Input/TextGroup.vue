<template>
  <div class="flex rounded-md shadow-sm">
    <div v-if="$slots.leading">
      <slot name="leading" />
    </div>
    <XInputText
      :input-class="textInputClass"
      class="flex items-stretch flex-grow focus-within:z-10 text-sm"
      v-model="modelValue"
      v-bind="omit($attrs, 'type')"
    />
    <div v-if="$slots.trailing">
      <slot name="trailing" />
    </div>
  </div>
</template>
<script>
import omit from "lodash/omit";
import { XButtonForm, XInputText } from "sg-skelly";
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
    };
  },
  computed: {
    textInputClass() {
      let inputClass = "";

      if (this.$slots.leading) {
        inputClass += " rounded-l-none";
      }

      if (this.$slots.trailing) {
        inputClass += " rounded-r-none";
      }

      return inputClass;
    },
  },
  methods: {
    handleInput(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>
