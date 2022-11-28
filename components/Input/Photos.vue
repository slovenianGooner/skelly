<template>
  <div
    class="relative border rounded flex flex-col items-center"
    :class="[errors.length > 0 ? 'border-red-300' : 'border-gray-300']"
  >
    <slot name="selected" :value="modelValue">
      <div class="text-sm w-full border-b text-gray-700">
        <div v-if="modelValue.length > 0">
          <draggable
            class="divide-y"
            v-model="photos"
            @change="sort"
            item-key="index"
          >
            <template #item="{ element, index }">
              <div
                class="py-2 px-2 grid gap-4 grid-cols-2 sm:grid-cols-6 md:grid-cols-2 lg:grid-cols-6"
              >
                <div class="flex col-span-2 xl:col-span-1">
                  <ChevronUpDownIcon class="w-5 h-5 mr-1.5 cursor-pointer" />

                  <div
                    class="w-full border border-gray-300 rounded overflow-hidden"
                  >
                    <img
                      :src="element.img"
                      alt=""
                      class="object-cover h-64 sm:h-32 md:h-64 lg:h-32 w-full"
                    />
                  </div>
                </div>
                <div class="col-span-2 sm:col-span-4 xl:col-span-5">
                  <div class="truncate">{{ element.name }}</div>
                  <button class="underline" @click="removePhoto(index)">
                    Remove
                  </button>
                </div>
              </div>
            </template>
          </draggable>
        </div>
        <div v-else class="p-4 flex justify-center">No photos selected.</div>
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
      accept="image/*"
      @change="handleFileChange"
      v-bind="$attrs"
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
import draggable from "vuedraggable/src/vuedraggable";
import { XButtonForm } from "sg-skelly";
import {
  ExclamationCircleIcon,
  FolderIcon,
  TrashIcon,
  ChevronUpDownIcon,
} from "@heroicons/vue/24/solid";

export default {
  components: {
    XButtonForm,
    ExclamationCircleIcon,
    FolderIcon,
    TrashIcon,
    ChevronUpDownIcon,
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
      type: [Array, String],
      default: () => [],
    },
    modelValue: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      previews: [],
      photos: this.value,
    };
  },
  watch: {
    photos() {
      this.previews = [];
    },
  },
  methods: {
    handleFileChange(e) {
      this.photos = Array.from(e.target.files).map((photo) => {
        return new Promise((resolve, reject) => {
          const temporaryFileReader = new FileReader();
          temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException("Problem parsing input file."));
          };

          temporaryFileReader.onload = () => {
            photo.img = temporaryFileReader.result;
            resolve(photo);
          };
          temporaryFileReader.readAsDataURL(photo);
        });
      });

      Promise.all(this.photos).then((photos) => {
        this.photos = photos;
        this.$emit("update:modelValue", this.photos);
      });
    },
    sort(e) {
      this.$emit("update:modelValue", this.photos);
    },
    removePhoto(index) {
      let newValue = [...this.photos];

      newValue.splice(index, 1);

      this.photos = newValue;
      this.$emit("update:modelValue", this.photos);
    },
  },
};
</script>
