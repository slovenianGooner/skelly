<template>
  <x-modal ref="modal" v-bind="$attrs">
    <template #header>
      <slot name="header" />
    </template>
    <slot />
    <template #footer="{ close }">
      <div class="flex justify-end items-center space-x-2">
        <x-button-form-md @click="close">{{ cancel }}</x-button-form-md>
        <x-button-form-md
          color="red"
          text-color="text-white"
          @click="
            close();
            $emit('submit');
          "
        >
          {{ confirm }}
        </x-button-form-md>
      </div>
    </template>
  </x-modal>
</template>
<script>
export default {
  props: {
    cancel: {
      type: String,
      default: "Cancel",
    },
    confirm: {
      type: String,
      default: "Confirm",
    },
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
