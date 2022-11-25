<script setup lang="ts">
const props = defineProps({
  type: {type: String, default: "button",},
});
</script>

<template>
  <button
    :type="type"
    @click="$emit('click', $event)"
    class="btn"
  >
    <slot/>
  </button>
</template>

<style scoped>
.btn {
  text-transform: none;
}
</style>