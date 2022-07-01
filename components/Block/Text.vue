<template>
  <div>
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
import { XInputLabel, XInputEditor, blockMixin } from "sg-skelly";

export default {
  components: {
    XInputLabel,
    XInputEditor,
  },
  mixins: [blockMixin],
  data() {
    return {
      form: {
        text: null,
      },
    };
  },
};
</script>
