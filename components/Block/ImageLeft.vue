<template>
  <div>
    <XInputLabel for="photo"> Photo </XInputLabel>
    <div class="mt-1">
      <XInputPhoto
        v-model="form.image.file"
        :src="form.image.url"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
  <div class="mt-4">
    <XInputLabel for="caption"> Caption </XInputLabel>
    <div class="mt-1">
      <XInputText
        v-model="form.caption"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
  <div class="mt-4">
    <XInputLabel for="text"> Text </XInputLabel>
    <div class="mt-1">
      <XInputEditor
        v-model="form.text"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
</template>
<script>
import XInputLabel from "../Input/Label.vue";
import XInputEditor from "../Input/Editor.vue";
import XInputPhoto from "../Input/Photo.vue";
import XInputText from "../Input/Text.vue";
import blockMixin from "../../mixins/block.js";

export default {
  components: {
    XInputLabel,
    XInputEditor,
    XInputPhoto,
    XInputText,
  },
  mixins: [blockMixin],
  data() {
    return {
      form: {
        image: {
          file: null,
          url: null,
        },
        caption: null,
        text: null,
      },
    };
  },
};
</script>
