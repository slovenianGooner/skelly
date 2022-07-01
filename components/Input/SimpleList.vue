<template>
  <XInputList
    :collapsed="false"
    :modelValue="items"
    @update:modelValue="handleInput"
    v-bind="$attrs"
    simple
  >
    <template #default="{ item, index, extraData }">
      <slot :item="item" :index="index" :extraData="extraData" />
    </template>
    <template #buttons v-if="$slots.buttons">
      <slot name="buttons" />
    </template>
  </XInputList>
</template>
<script>
import { XInputList } from "sg-skelly";
export default {
  components: {
    XInputList,
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.items = this.modelValue.map((item) => {
      return { value: item, collapsed: false };
    });
  },
  methods: {
    handleInput(e) {
      this.$emit(
        "update:modelValue",
        e.map((item) => {
          return item.value;
        })
      );
    },
  },
};
</script>
