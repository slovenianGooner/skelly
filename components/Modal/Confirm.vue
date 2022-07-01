<template>
  <XModal ref="modal" v-bind="$attrs">
    <template #header>
      <slot name="header" />
    </template>
    <slot />
    <template #footer="{ close }">
      <div class="flex justify-end items-center space-x-2">
        <XButtonForm @click="close">{{ cancel }}</XButtonForm>
        <XButtonForm
          color="red"
          text-color="text-white"
          @click="onSubmit">
          {{ confirm }}
        </XButtonForm>
      </div>
    </template>
  </XModal>
</template>
<script>
import { XModal, XButtonForm } from "sg-skelly";
export default {
  components: {
    XModal,
    XButtonForm,
  },
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
  data: function () {
    return {
      callback: null,
    }
  },
  methods: {
    show(callback) {
      this.callback = callback;
      this.$refs.modal.show();
    },
    close() {
      this.$refs.modal.close();
    },
    onSubmit() {
      this.close();
      if (this.callback !== undefined) {
        this.callback();
      } else {
        this.$emit('submit');
      }
    }
  },
};
</script>
