<template>
  <div class="form-control w-full max-w-xs">
    <label class="label" v-if="label && !labelAsPlaceholder">
      <span class="label-text" :class="{'text-error' : isError}">{{ label }}</span>
    </label>
    <select class="select focus:outline-none"
            :class="[inputClass, {'select-bordered': bordered, 'select-error' : isError}]"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :disabled="disabled">
      <option v-if="label && labelAsPlaceholder" value="" selected disabled>{{ label }}</option>
      <option v-if="empty && empty.title" :value="empty.value" v-html="empty.title"/>
      <option :value="resolveValue(item, index)" v-for="(item, index) in options" :key="index">
        {{ resolveLabel(item) }}
      </option>
    </select>
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
    label: {
      type: String,
    },
    labelAsPlaceholder: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
    errors: {
      type: [Array, String],
      default: () => [],
    },
    empty: {
      type: [Object, {title: null, value: null}],
    },
    modelValue: {
      required: true,
    },
    labelResolver: {
      default: null,
    },
    valueResolver: {
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inputClass: {
      type: String,
      required: false,
    },
  },
  computed: {
    isError: function () {
      return this.errors && this.errors.length > 0;
    }
  },
  methods: {
    resolveValue(item, index) {
      if (typeof this.valueResolver === "function") {
        return this.valueResolver(item);
      }
      if (this.valueResolver) {
        return item[this.valueResolver];
      }
      return item;
    },
    resolveLabel(item) {
      if (typeof this.labelResolver === "function") {
        return this.labelResolver(item);
      }
      if (this.labelResolver) {
        return item[this.labelResolver];
      }
      return item;
    },
    parseErrors() {
      if (this.errors instanceof Array) {
        return this.errors;
      }
      return [this.errors];
    },
  },
};
</script>
