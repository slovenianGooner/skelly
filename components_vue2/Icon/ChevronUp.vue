<template>
  <svg
    :class="[size]"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M19 9l-7 7-7-7"
    ></path>
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
