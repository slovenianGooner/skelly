<template>
  <div class="overflow-hidden relative">
    <component
      :is="tag"
      :href="href"
      class="w-full group flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md focus:outline-none"
      :class="[colors]"
      @click="tag === 'button' ? handleClick($event) : null"
      ref="link"
    >
      <div class="flex items-center">
        <component
          :is="'x-icon-' + icon"
          class="mr-2"
          v-if="icon && !$slots.icon"
        />
        <slot name="icon" />
        <span>{{ title }}</span>
        <span
          v-if="badge"
          class="ml-1.5 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-gray-100 text-gray-800"
        >
          {{ badge }}
        </span>
      </div>
      <div class="flex items-center" v-if="$slots.default">
        <x-icon-chevron-down v-if="open" />
        <x-icon-chevron-up v-else />
      </div>
    </component>
    <div
      v-if="$slots.default && open"
      class="pl-4 py-1 rounded mt-1"
      :class="[submenuColor]"
    >
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    inertia: {
      type: Boolean,
    },
    href: {
      type: String,
      default: "#",
    },
    badge: {
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    icon: {
      default: null,
    },
    colors: {
      type: String,
      default: "text-gray-300 hover:text-white hover:bg-gray-900",
    },
    submenuColor: {
      type: String,
      default: "bg-gray-900",
    },
    initialOpenState: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: this.initialOpenState,
    };
  },
  computed: {
    tag() {
      if (this.$slots.default) {
        return "button";
      }

      if (this.inertia) {
        return "inertia-link";
      }

      return "a";
    },
  },
  methods: {
    handleClick(e) {
      if (this.$slots.default) {
        this.open = !this.open;
        return;
      }
    },
  },
};
</script>
