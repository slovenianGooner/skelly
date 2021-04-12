<template>
  <div>
    <XInputLabel for="file"> File </XInputLabel>
    <div class="mt-1">
      <XInputFile
        v-model="form.file"
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
import XInputFile from "../Input/File";
import XInputText from "../Input/Text";
import blockMixin from "../../mixins/block";

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
        file: {
          new_url: null,
        },
        caption: null,
      },
    };
  },
};
</script>
