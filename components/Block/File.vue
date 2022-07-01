<template>
  <div>
    <XInputLabel for="file"> File </XInputLabel>
    <div class="mt-1">
      <XInputFile
        v-model="form.attachment.file"
        :src="form.attachment.url"
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
import { XInputLabel, XInputFile, XInputText, blockMixin } from "sg-skelly";

export default {
  components: {
    XInputLabel,
    XInputFile,
    XInputText,
  },
  mixins: [blockMixin],
  data() {
    return {
      form: {
        attachment: {
          file: null,
          url: null,
        },
        caption: null,
      },
    };
  },
};
</script>
