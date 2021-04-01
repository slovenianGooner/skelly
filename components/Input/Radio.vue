<template>
  <div>
    <div class="relative flex items-start">
      <div class="flex items-center h-5">
        <input
          :id="id"
          type="radio"
          :checked="isChecked"
          :value="value"
          @change="updateInput"
          class="h-4 w-4 border-gray-300"
          :class="[colors]"
        />
      </div>
      <div class="ml-3 text-sm">
        <label :for="id" class="font-medium text-gray-700">{{ label }}</label>
      </div>
    </div>
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
    colors: {
      type: String,
      default: "focus:ring-red-500 text-red-600",
    },
  },
  computed: {
    isChecked() {
      return this.modelValue === this.value;
    },
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", this.value);
    },
  },
};
</script>
