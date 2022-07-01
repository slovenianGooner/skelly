<template>
  <div class="bg-white rounded-md shadow-sm divide-y">
    <div class="flex justify-between items-center px-4 py-3 sm:px-6">
      <div class="text-xl font-bold">
        <span v-if="$slots.title">
          <slot name="title" />
        </span>
        <span v-else>{{ title }}</span>
      </div>
      <XButtonForm size="xs" @click="toggle">
        <MinusIcon class="w-6 h-6" v-if="open" />
        <PlusIcon class="w-6 h-6" v-else />
      </XButtonForm>
    </div>
    <div v-if="open" class="px-4 py-6 sm:px-6">
      <slot />
    </div>
  </div>
</template>
<script>
import { XButtonForm } from "sg-skelly";
import { MinusIcon, PlusIcon } from "@heroicons/vue/solid";

export default {
  components: {
    XButtonForm,
    MinusIcon,
    PlusIcon,
  },
  props: {
    collapsed: {
      type: Boolean,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      open: !this.collapsed,
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>
