<template>
  <svg
    :class="[size]"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentcolor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
