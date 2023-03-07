<template>
  <div v-if="html.length" class="space-y-4">
    <XInputList v-model="html" :disable-adding="true" :collapsed="false">
      <template #default="{ item, index }">
        <component 
          v-if="defaultBlocks[item.type]" 
          :is="defaultBlocks[item.type].component" 
          :block="item" 
          :blockIndex="index"
        />
      </template>
    </XInputList>
  </div>
  <div v-else>
    <div class="p-6 border rounded-md flex items-center justify-center">
      {{noBlocks}}
    </div>
  </div>
  <div class="mt-4">
    <XButtonDropdown
      origin="origin-top-left left-0"
      max-height="max-h-64 overflow-y-auto"
    >
      <template #button="{ toggleDropdown }">
        <XButtonForm @click.prevent="toggleDropdown"> {{addNew}} </XButtonForm>
      </template>
      <template #links="{ toggleDropdown }">
        <button
          class="text-left w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          v-for="(block, index) in displayBlocks"
          :key="index"
          @click.prevent="
            add(block);
            toggleDropdown();
          "
        >
          {{ defaultBlocks[block].name }}
        </button>
      </template>
    </XButtonDropdown>
  </div>
</template>
<script>
import XButtonDropdown from "../Button/Dropdown.vue";
import XButtonForm from "../Button/Form.vue";
import XBlockFile from "../Block/File.vue";
import XBlockImage from "../Block/Image.vue";
import XBlockImageLeft from "../Block/ImageLeft.vue";
import XBlockImageRight from "../Block/ImageRight.vue";
import XBlockText from "../Block/Text.vue";
import XBlockThreeImages from "../Block/ThreeImages.vue";
import XBlockThreeTexts from "../Block/ThreeTexts.vue";
import XBlockTwoImages from "../Block/TwoImages.vue";
import XBlockTwoTexts from "../Block/TwoTexts.vue";
import XBlockVideo from "../Block/Video.vue";
import XInputList from "../Input/List.vue";
import { nanoid } from "nanoid";
import { shallowRef } from "@vue/reactivity";

export default {
  components: {
    XButtonDropdown,
    XButtonForm,
    XBlockFile,
    XBlockImage,
    XBlockImageLeft,
    XBlockImageRight,
    XBlockText,
    XBlockThreeImages,
    XBlockThreeTexts,
    XBlockTwoImages,
    XBlockTwoTexts,
    XBlockVideo,
    XInputList,
  },
  props: {
    modelValue: {
      required: true,
      type: Array,
    },
    blocks: {
      type: Array,
      default: () => ["default"],
    },
    addNew: {
      type: String,
      default: "Add block"
    },
    noBlocks: {
      type: String,
      default: "No blocks."
    }
  },
  data() {
    return {
      defaultBlocks: shallowRef({
        file: { name: "File", component: XBlockFile },
        image: { name: "Image", component: XBlockImage },
        image_left: { name: "Image Left", component: XBlockImageLeft },
        image_right: { name: "Image Right", component: XBlockImageRight },
        text: { name: "Text", component: XBlockText },
        three_images: { name: "Three Images", component: XBlockThreeImages },
        three_texts: { name: "Three Texts", component: XBlockThreeTexts },
        two_images: { name: "Two Images", component: XBlockTwoImages },
        two_texts: { name: "Two Texts", component: XBlockTwoTexts },
        video: { name: "Video", component: XBlockVideo },
      }),
      html: this.modelValue,
    };
  },
  watch: {
    html() {
      this.$emit("update:modelValue", this.html);
    },
  },
  created() {
    this.html = this.modelValue.map((block) => {
      return { ...block, id: nanoid(), open: true };
    });
  },
  computed: {
    displayBlocks() {
      let blocks = [];

      this.blocks.forEach((block) => {
        if (block === "default") {
          blocks = [...blocks, ...Object.keys(this.defaultBlocks)];
        } else if (typeof block === "string") {
          blocks.push(block);
        } else if (typeof block === "object") {
          this.defaultBlocks[block.key] = block;
          blocks.push(block.key);
        }
      });

      return blocks;
    },
  },
  methods: {
    add(key) {
      this.html.push({
        uid: nanoid(),
        type: key,
        form: this.defaultBlocks[key].component.data().form,
        open: true,
      });
    },
  },
};
</script>
