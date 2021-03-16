<template>
  <component
    :is="inertia ? 'inertia-link' : 'a'"
    :href="href"
    class="inline-flex items-center border border-transparent font-medium rounded-md shadow-sm focus:outline-none"
    :class="[
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
    textColor: {
      type: String,
      default: "text-gray-700",
    },
    noRing: {
      type: Boolean,
    },
  },
  computed: {
    buttonColor() {
      if (this.color === "") {
        return "bg-white hover:bg-gray-50 focus:ring-gray-500 border-gray-300";
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
