<template>
  <div>
    <XInputLabel for="photo_1"> Photo 1 </XInputLabel>
    <div class="mt-1">
      <XInputPhoto
        v-model="form.image_1.file"
        :src="form.image_1.src"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
  <div class="mt-4">
    <XInputLabel for="caption"> Caption 1 </XInputLabel>
    <div class="mt-1">
      <XInputText
        v-model="form.caption_1"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
  <div class="mt-4">
    <XInputLabel for="photo_1"> Photo 2 </XInputLabel>
    <div class="mt-1">
      <XInputPhoto
        v-model="form.image_2.file"
        :src="form.image_2.src"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
  <div class="mt-4">
    <XInputLabel for="caption"> Caption 2 </XInputLabel>
    <div class="mt-1">
      <XInputText
        v-model="form.caption_2"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
  <div class="mt-4">
    <XInputLabel for="photo_1"> Photo 3 </XInputLabel>
    <div class="mt-1">
      <XInputPhoto
        v-model="form.image_3.file"
        :src="form.image_3.src"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
  <div class="mt-4">
    <XInputLabel for="caption"> Caption 3 </XInputLabel>
    <div class="mt-1">
      <XInputText
        v-model="form.caption_3"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
</template>
<script>
import XInputLabel from "../Input/Label";
import XInputPhoto from "../Input/Photo";
import XInputText from "../Input/Text";
import blockMixin from "../../mixins/block";

export default {
  components: {
    XInputLabel,
    XInputPhoto,
    XInputText,
  },
  mixins: [blockMixin],
  data() {
    return {
      form: {
        image_1: {
          file: null,
          src: null,
        },
        caption_1: null,
        image_2: {
          file: null,
          src: null,
        },
        caption_2: null,
        image_3: {
          file: null,
          src: null,
        },
        caption_3: null,
      },
    };
  },
};
</script>
