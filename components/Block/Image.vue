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
        image: {
          file: null,
          url: null,
        },
        caption: null,
      },
    };
  },
};
</script>
