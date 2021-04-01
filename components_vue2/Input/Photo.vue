<template>
  <div
    class="relative border rounded p-4 flex flex-col items-center"
    :class="[errors.length > 0 ? 'border-red-500' : 'border-gray-300']"
  >
    <slot name="selected" :value="value">
      <div class="text-sm mb-4">
        <span v-if="preview">
          <img :src="preview" alt="" class="w-64 rounded" />
        </span>
        <span v-else>No photo selected.</span>
      </div>
    </slot>
    <div class="space-x-2">
      <x-button-form-xs @click="$refs.fileInput.click()">
        <x-icon-folder size="w-4 h-4" class="mr-1.5" />
        {{ button }}
      </x-button-form-xs>
      <x-button-form-xs @click="clearFileInputValue" v-if="value">
        <x-icon-trash size="w-4 h-4" class="mr-1.5" />
        {{ clear }}
      </x-button-form-xs>
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
      <x-icon-exclamation-circle
        size="w-5 h-5"
        class="text-red-500"
        viewBox="0 0 20 20"
      />
    </div>
  </div>
</template>
<script>
export default {
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
      type: Array | String,
      default: () => [],
    },
    value: {
      required: true,
      type: File | null,
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
      this.$emit("input", file);

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
      this.$emit("input", null);
    },
  },
};
</script>
