<template>
  <div>
    <XInputLabel for="photo_1"> Photo 1 </XInputLabel>
    <div class="mt-1">
      <XInputPhoto
        v-model="form.image_1.file"
        :src="form.image_1.url"
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
        :src="form.image_2.url"
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
        :src="form.image_3.url"
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
import { XInputLabel, XInputPhoto, XInputText, blockMixin } from "sg-skelly";

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
          url: null,
        },
        caption_1: null,
        image_2: {
          file: null,
          url: null,
        },
        caption_2: null,
        image_3: {
          file: null,
          url: null,
        },
        caption_3: null,
      },
    };
  },
};
</script>
