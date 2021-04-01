<template>
  <x-modal
    ref="modal"
    fullscreen
    container-class="w-screen h-screen"
    modal-class="flex flex-col block left-0 top-0 bg-white text-left transform transition-all w-screen h-screen divide-y divide-y-gray-200"
    v-bind="$attrs"
  >
    <template #header>
      <slot name="header" />
    </template>
    <slot />
    <template #footer="{ close }">
      <slot name="footer" :close="close" />
    </template>
  </x-modal>
</template>
<script>
export default {
  methods: {
    show() {
      this.$refs.modal.show();
    },
    close() {
      this.$refs.modal.close();
    },
  },
};
</script>
