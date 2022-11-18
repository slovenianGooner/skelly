<template>
  <div class="form-control w-full max-w-xs">
    <label class="label" v-if="!labelAsPlaceholder">
      <span class="label-text" :class="{'text-error' : isError}">{{ label }}</span>
    </label>
    <input :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           type="text"
           :placeholder="labelAsPlaceholder ? label : ''"
           class="input input-bordered focus:outline-none"
           :class="[inputClass, { 'input-error' : isError }]"
    />
    <label class="label">
      <span class="label-text text-error">
        {{ parseErrors()[0] }}
      </span>
    </label>
  </div>
</template>
<script>
export default {
  props: {
    inputClass: {
      type: String,
      default: "",
    },
    errors: {
      type: [Array, String],
      default: () => [],
    },
    modelValue: {
      required: true,
    },
    label: {
      type: String,
    },
    labelAsPlaceholder: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isError: function () {
      return this.errors && this.errors.length > 0;
    }
  },
  methods: {
    parseErrors() {
      if (this.errors instanceof Array) {
        return this.errors;
      }
      return [this.errors];
    },
  }
};
</script>