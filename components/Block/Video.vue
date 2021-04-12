<template>
  <div>
    <XInputLabel for="video"> Video </XInputLabel>
    <div class="mt-1">
      <XInputTextarea
        v-model="form.embed_code"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
</template>
<script>
import XInputLabel from "../Input/Label";
import XInputTextarea from "../Input/Textarea";
import blockMixin from "../../mixins/block";

export default {
  components: {
    XInputLabel,
    XInputTextarea,
  },
  mixins: [blockMixin],
  data() {
    return {
      form: {
        embed_code: null,
      },
    };
  },
};
</script>
