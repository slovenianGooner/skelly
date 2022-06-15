<template>
  <div>
    <label class="relative flex items-start">
      <div class="flex items-center h-5">
        <input
          :id="id"
          type="checkbox"
          :checked="isChecked"
          :value="value"
          @change="updateInput"
          class="h-4 w-4 border-gray-300 rounded"
          :class="[colors]"
        />
      </div>
      <div class="ml-3 text-sm">
        <div class="font-medium text-gray-700 dark:text-gray-300">{{ label }}</div>
      </div>
    </label>
  </div>
</template>
<script>
export default {
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {},
    modelValue: {
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    trueValue: {
      default: true,
    },
    falseValue: {
      default: false,
    },
    colors: {
      type: String,
      default: "focus:ring-red-500 text-red-600",
    },
  },
  computed: {
    isChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value);
      }

      return this.modelValue === this.trueValue;
    },
  },
  methods: {
    updateInput(event) {
      let isChecked = event.target.checked;

      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue];

        if (isChecked) {
          newValue.push(this.value);
        } else {
          newValue.splice(newValue.indexOf(this.value), 1);
        }

        this.$emit("update:modelValue", newValue);
        return;
      }

      this.$emit(
        "update:modelValue",
        isChecked ? this.trueValue : this.falseValue
      );
    },
  },
};
</script>
