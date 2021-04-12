<template>
  <div>
    <XInputLabel for="code"> Code </XInputLabel>
    <div class="mt-1">
      <XInputCode
        v-model="form.code"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
  <div>
    <div v-html="form.code"></div>
  </div>
</template>
<script>
import XInputLabel from "../Input/Label";
import XInputCode from "../Input/Code";
import blockMixin from "../../mixins/block";

export default {
  components: {
    XInputLabel,
    XInputCode,
  },
  mixins: [blockMixin],
  data() {
    return {
      form: {
        code: null,
      },
    };
  },
};
</script>
