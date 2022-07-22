<template>
  <div
    class="relative border rounded flex flex-col items-center"
    :class="[errors.length > 0 ? 'border-red-300' : 'border-gray-300']"
  >
    <slot name="selected" :value="modelValue">
      <div class="text-sm w-full border-b text-gray-700">
        <div v-if="modelValue.length > 0">
          <draggable
            v-model="files"
            class="divide-y"
            @change="sort"
            item-key="index"
          >
            <template #item="{ element, index }">
              <div class="py-2 px-2 flex items-center justify-between">
                <SelectorIcon class="w-5 h-5 mr-1.5 cursor-pointer" />
                <div class="truncate w-96">{{ element[displayProp] }}</div>
                <button class="underline" @click="removeFile(index)">
                  Remove
                </button>
              </div>
            </template>
          </draggable>
        </div>
        <div v-else class="p-4 flex justify-center">{{ noFiles }}</div>
      </div>
    </slot>
    <div class="space-x-2 p-4">
      <XButtonForm size="xs" @click="$refs.fileInput.click()">
        <FolderIcon class="w-4 h-4 mr-1.5" />
        {{ button }}
      </XButtonForm>
      <XButtonForm
        size="xs"
        @click="$emit('update:modelValue', [])"
        v-if="modelValue"
      >
        <TrashIcon class="w-4 h-4 mr-1.5" />
        {{ clear }}
      </XButtonForm>
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
      class="
        absolute
        inset-y-0
        right-0
        pr-3
        flex
        items-center
        pointer-events-none
      "
      v-if="errors.length"
    >
      <ExclamationCircleIcon class="w-5 h-5 text-red-500" />
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import XButtonForm from "../Button/Form";
import {
  ExclamationCircleIcon,
  FolderIcon,
  TrashIcon,
  SelectorIcon,
} from "@heroicons/vue/solid";
export default {
  components: {
    XButtonForm,
    ExclamationCircleIcon,
    FolderIcon,
    TrashIcon,
    SelectorIcon,
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
    noFiles: {
      type: String,
      default: "No files selected.",
    },
    inputClass: {
      type: String,
      default: "",
    },
    errors: {
      type: [Array, String],
      default: () => [],
    },
    displayProp: {
        type: String,
        default: 'url',
        required: false,
    },
    modelValue: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      files: this.modelValue,
    };
  },
  methods: {
    handleFileChange(e) {
      this.files = Array.from(e.target.files);
      this.$emit("update:modelValue", this.files);
    },
    sort(e) {
      this.$emit("update:modelValue", this.files);
    },
    removeFile(index) {
      let newValue = [...this.files];

      newValue.splice(index, 1);

      this.files = newValue;
      this.$emit("update:modelValue", this.files);
    },
  },
};
</script>
