<template>
  <button
    :type="type"
    @click="$emit('click', $event)"
    class="inline-flex items-center border border-transparent font-medium rounded-md shadow-sm focus:outline-none"
    :class="[
      buttonColor,
      textColor,
      noRing ? '' : 'focus:ring-2 focus:ring-offset-2',
    ]"
  >
    <slot />
  </button>
</template>
<script>
export default {
  props: {
    handleClick: {
      type: Function,
    },
    type: {
      type: String,
      default: "button",
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
