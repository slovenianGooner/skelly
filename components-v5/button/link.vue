<script setup lang="ts">

const props = defineProps({
  inertia: {type: Boolean, default: false},
  href: {type: String, required: true},
  isButton: {type: Boolean, default: true},
});

</script>

<template>
  <component
    :is="inertia ? 'inertia-link' : 'a'"
    :href="href"
    :class="{'btn': isButton}"
  >
    <slot />
  </component>
</template>

<style scoped>
.btn {
  text-transform: none;
}
</style>