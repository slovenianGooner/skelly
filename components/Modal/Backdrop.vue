<template>
  <div
    class="fixed inset-0 transition-opacity"
    aria-hidden="true"
    @click="$emit('click')"
  >
    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
  </div>
</template>
