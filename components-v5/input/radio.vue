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
             class="radio"/>
      <span class="label-text">{{ label }}</span>
    </label>
  </div>
</template>
