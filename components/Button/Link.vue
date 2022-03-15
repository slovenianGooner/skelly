<template>
  <component
    :is="inertia ? 'inertia-link' : 'a'"
    :href="href"
    class="inline-flex items-center border font-medium rounded-md shadow-sm focus:outline-none"
    :class="[
      buttonSize,
      buttonColor,
      textColor,
      noRing ? '' : 'focus:ring-2 focus:ring-offset-2',
    ]"
  >
    <slot />
  </component>
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
    color: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "md",
    },
    textColor: {
      type: String,
      default: "text-gray-700 dark:text-gray-300",
    },
    noRing: {
      type: Boolean,
    },
  },
  computed: {
    buttonSize() {
      if (this.size === "xs") {
        return "px-2.5 py-1.5 text-xs";
      }

      if (this.size === "sm") {
        return "px-3 py-2 text-sm";
      }

      if (this.size === "md") {
        return "px-4 py-2 text-sm";
      }

      if (this.size === "lg") {
        return "px-4 py-2 text-base";
      }

      if (this.size === "xl") {
        return "px-6 py-3 text-base";
      }

      return this.size;
    },
    buttonColor() {
      if (this.color === "") {
        return "bg-white hover:bg-gray-50 focus:ring-gray-500 border-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700";
      }

      return (
        "bg-" +
        this.color +
        "-600 hover:bg-" +
        this.color +
        "-700 focus:ring-" +
        this.color +
        "-500 border-transparent"
      );
    },
  },
};
</script>
