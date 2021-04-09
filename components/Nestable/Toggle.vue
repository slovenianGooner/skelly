<template>
  <button
    v-if="item.children && item.children.length > 0"
    class="focus:outline-none"
  >
    <MinusIcon class="w-5 h-5" v-if="item.isOpen" />
    <PlusIcon class="w-5 h-5" v-else />
  </button>
</template>
<script>
import { PlusIcon, MinusIcon } from "@heroicons/vue/outline";

export default {
  components: {
    PlusIcon,
    MinusIcon,
  },
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
};
</script>
