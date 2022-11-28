<template>
  <div
    class="relative border rounded-md p-4 flex flex-col items-center"
    :class="[errors.length > 0 ? 'border-red-300' : 'border-gray-300']"
  >
    <slot name="selected" :value="modelValue">
      <div class="text-sm mb-4">
        <span v-if="preview">
          <img :src="preview" alt="" class="w-64 rounded" />
        </span>
        <span v-else>No photo selected.</span>
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
      accept="image/*"
      @change="handleFileChange"
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
import { XButtonForm } from "sg-skelly";
import {
  ExclamationCircleIcon,
  FolderIcon,
  TrashIcon,
} from "@heroicons/vue/24/solid";
export default {
  components: {
    ExclamationCircleIcon,
    FolderIcon,
    TrashIcon,
    XButtonForm,
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
  },
  data() {
    return {
      preview: this.src,
    };
  },
  methods: {
    handleFileChange(e) {
      let file = e.target.files[0];
      this.$emit("update:modelValue", file);

      // Generate preview
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.preview = reader.result;
      };
    },
    clearFileInputValue() {
      this.preview = this.src;
      this.$refs.fileInput.value = null;
      this.$emit("update:modelValue", null);
    },
  },
};
</script>
