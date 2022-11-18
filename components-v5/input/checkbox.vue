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
    trueValue: {
      default: true,
    },
    falseValue: {
      default: false,
    },
    inputClass: {
      type: String,
      required: false,
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

<template>
  <div class="form-control">
    <label class="label cursor-pointer justify-start gap-4">
      <input
        :id="id"
        type="checkbox"
        :checked="isChecked"
        :value="value"
        @change="updateInput"
        class="checkbox"
        :class="inputClass"
      />
      <span class="label-text">{{ label }}</span>
    </label>
  </div>
</template>

<style scoped>

</style>