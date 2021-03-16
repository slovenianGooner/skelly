<template>
  <x-input-list
    :collapsed="false"
    :value="items"
    @input="handleInput"
    v-bind="$attrs"
    simple
  >
    <template #default="{ item, index, extraData }">
      <slot :item="item" :index="index" :extraData="extraData" />
    </template>
  </x-input-list>
</template>
<script>
import Template from "../Icon/Template.vue";
export default {
  components: { Template },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    value: {
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
    this.items = this.value.map((item) => {
      return { value: item, collapsed: false };
    });
  },
  methods: {
    handleInput(e) {
      this.$emit(
        "input",
        e.map((item) => {
          return item.value;
        })
      );
    },
  },
};
</script>
