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
import XInputLabel from "../Input/Label";
import XInputEditor from "../Input/Editor";
import blockMixin from "../../mixins/block";

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
