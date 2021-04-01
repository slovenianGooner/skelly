<template>
  <svg
    :class="[size]"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clip-rule="evenodd"
    />
  </svg>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      default: "w-6 h-6",
    },
  },
};
</script>
