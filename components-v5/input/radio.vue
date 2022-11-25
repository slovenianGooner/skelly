<script>
export default {
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    id: {
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
    inputClass: {
      type: String,
      required: false,
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

<template>
  <div class="form-control">
    <label class="label cursor-pointer justify-start gap-4">
      <input :id="id"
             type="radio"
             :checked="isChecked"
             :value="value"
             @change="updateInput"
             class="radio"
             :class="inputClass"
      />
      <span class="label-text">{{ label }}</span>
    </label>
  </div>
</template>
