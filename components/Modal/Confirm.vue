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
          @click="
            close();
            $emit('submit');
          "
        >
          {{ confirm }}
        </XButtonForm>
      </div>
    </template>
  </XModal>
</template>
<script>
import XModal from "../Modal";
import XButtonForm from "../Button/Form";
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
