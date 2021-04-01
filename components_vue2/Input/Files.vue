<template>
  <div
    class="relative border rounded flex flex-col items-center"
    :class="[errors.length > 0 ? 'border-red-500' : 'border-gray-300']"
  >
    <slot name="selected" :value="value">
      <div class="text-sm w-full border-b text-gray-700">
        <div v-if="value.length > 0">
          <draggable v-model="files" class="divide-y" @change="sort">
            <div
              v-for="(file, index) in files"
              :key="index"
              class="py-2 px-2 flex items-center justify-between"
            >
              <x-icon-selector size="w-5 h-5" class="mr-1.5 cursor-pointer" />
              <div class="truncate w-96">{{ file.name }}</div>
              <button class="underline" @click="removeFile(index)">
                Remove
              </button>
            </div>
          </draggable>
        </div>
        <div v-else class="p-4 flex justify-center">No files selected.</div>
      </div>
    </slot>
    <div class="space-x-2 p-4">
      <x-button-form-xs @click="$refs.fileInput.click()">
        <x-icon-folder size="w-4 h-4" class="mr-1.5" />
        {{ button }}
      </x-button-form-xs>
      <x-button-form-xs @click="$emit('input', [])" v-if="value">
        <x-icon-trash size="w-4 h-4" class="mr-1.5" />
        {{ clear }}
      </x-button-form-xs>
    </div>
    <input
      multiple
      type="file"
      class="hidden"
      ref="fileInput"
      @change="handleFileChange"
      v-bind="$attrs"
    />
    <div
      class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      v-if="errors.length"
    >
      <x-icon-exclamation-circle
        size="w-5 h-5"
        class="text-red-500"
        viewBox="0 0 20 20"
      />
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  inheritAttrs: false,
  props: {
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
      type: Array | String,
      default: () => [],
    },
    value: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      files: this.value,
    };
  },
  methods: {
    handleFileChange(e) {
      this.files = Array.from(e.target.files);
      this.$emit("input", this.files);
    },
    sort(e) {
      this.$emit("input", this.files);
    },
    removeFile(index) {
      let newValue = [...this.files];

      newValue.splice(index, 1);

      this.files = newValue;
      this.$emit("input", this.files);
    },
  },
};
</script>
