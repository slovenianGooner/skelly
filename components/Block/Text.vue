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
import XInputLabel from "../Input/Label.vue";
import XInputEditor from "../Input/Editor.vue";
import blockMixin from "../../mixins/block.js";

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
