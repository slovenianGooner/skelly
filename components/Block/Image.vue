<template>
  <div>
    <XInputLabel for="photo"> Photo </XInputLabel>
    <div class="mt-1">
      <XInputPhoto
        v-model="form.image.file"
        :src="form.image.src"
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
        image: {
          file: null,
          src: null,
        },
        caption: null,
      },
    };
  },
};
</script>
