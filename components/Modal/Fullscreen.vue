<template>
  <XModal
    ref="modal"
    fullscreen
    :transition="false"
    v-bind="$attrs"
    class="overflow-y-none"
    container-class="w-screen h-screen"
    modal-class="flex flex-col left-0 top-0 bg-white text-left transform transition-all w-screen h-screen overflow-hidden divide-y divide-y-gray-200"
  >
    <template #header>
      <slot name="header" />
    </template>
    <slot />
    <template #footer="{ close }">
      <slot name="footer" :close="close" />
    </template>
  </XModal>
</template>
<script>
import XModal from "../Modal";
export default {
  components: {
    XModal,
  },
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
