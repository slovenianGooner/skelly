<template>
  <div>
    <XInputLabel for="text_1"> Text 1 </XInputLabel>
    <div class="mt-1">
      <XInputEditor
        v-model="form.text_1"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </div>
  </div>
  <div class="mt-4">
    <XInputLabel for="text_1"> Text 2 </XInputLabel>
    <div class="mt-1">
      <XInputEditor
        v-model="form.text_2"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </div>
  </div>

  <div class="mt-4">
    <XInputLabel for="text_1"> Text 3 </XInputLabel>
    <div class="mt-1">
      <XInputEditor
        v-model="form.text_3"
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
        text_1: null,
        text_2: null,
        text_3: null,
      },
    };
  },
};
</script>
