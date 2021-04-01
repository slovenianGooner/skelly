<template>
  <div class="flex items-center">
    <input
      type="radio"
      class="hidden"
      ref="radio"
      :checked="isChecked"
      :value="value"
      @change="updateInput"
      :id="id"
    />
    <button
      type="button"
      class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      aria-pressed="false"
      :class="[activeState]"
      @click="$refs.radio.click()"
    >
      <span
        aria-hidden="true"
        class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
        :class="[isChecked ? 'translate-x-5' : 'translate-x-0']"
      ></span>
    </button>
    <span class="ml-3" v-if="label">
      <label :for="id" class="text-sm font-medium text-gray-700">
        {{ label }}
      </label>
    </span>
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
      required: true,
    },
    value: {},
    modelValue: {
      default: false,
    },
    label: {
      type: String,
      default: null,
    },
    activeColor: {
      type: String,
      default: "bg-red-600",
    },
  },
  computed: {
    isChecked() {
      return this.modelValue === this.value;
    },
    activeState() {
      if (this.isChecked) {
        return this.activeColor;
      }

      return "bg-gray-200";
    },
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", this.value);
    },
  },
};
</script>
