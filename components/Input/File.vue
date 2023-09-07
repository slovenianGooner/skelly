<template>
  <div
    class="relative border rounded p-4 flex flex-col items-center"
    :class="[errors.length > 0 ? 'border-red-300' : 'border-gray-300']"
  >
    <slot name="selected" :value="modelValue">
      <div class="text-sm mb-4">
        <div v-if="preview" class="mb-4 text-center">
          <a :href="preview" target="_blank" class="underline">Current file</a>
        </div>
        {{ modelValue ? modelValue.name : "No file selected." }}
      </div>
    </slot>
    <div class="space-x-2">
      <XButtonForm size="xs" @click="$refs.fileInput.click()">
        <FolderIcon class="w-4 h-4 mr-1.5" />
        {{ button }}
      </XButtonForm>
      <XButtonForm size="xs" @click="clearFileInputValue" v-if="modelValue">
        <TrashIcon class="w-4 h-4 mr-1.5" />
        {{ clear }}
      </XButtonForm>
    </div>
    <input
      type="file"
      class="hidden"
      ref="fileInput"
      @change="handleFileChange"
      :accept="accept"
    />
    <div
      class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      v-if="errors.length"
    >
      <ExclamationCircleIcon class="w-5 h-5 text-red-500" />
    </div>
  </div>
</template>
<script>
import XButtonForm from "../Button/Form";
import {
  ExclamationCircleIcon,
  FolderIcon,
  TrashIcon,
} from "@heroicons/vue/solid";
export default {
  components: {
    XButtonForm,
    ExclamationCircleIcon,
    FolderIcon,
    TrashIcon,
  },
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      default: null,
    },
    button: {
      type: String,
      default: "Browse",
    },
    clear: {
      type: String,
      default: "Clear",
    },
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
    accept: {
      type: String,
      default: '*/*'
    },
  },
  data() {
    return {
      preview: this.src,
    };
  },
  methods: {
    handleFileChange(e) {
      this.$emit("update:modelValue", e.target.files[0]);
    },
    clearFileInputValue() {
      this.$refs.fileInput.value = null;
      this.$emit("update:modelValue", null);
    },
  },
};
</script>
