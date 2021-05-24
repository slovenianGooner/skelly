<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" v-show="open" tabindex="0">
    <div :class="[containerClass]">
      <transition
        v-if="transition"
        name="modal-backdrop"
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <XModalBackdrop
          @click="dismissable ? close() : null"
          v-show="open"
        />
      </transition>
      <div v-else>
        <XModalBackdrop
          @click="dismissable ? close() : null"
          v-show="open"
        />
      </div>

      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        v-if="!fullscreen"
        >&#8203;</span
      >

      <transition
        v-if="transition"
        name="modal"
        enter-active-class="ease-out duration-300"
        enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-300"
        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          :class="[dialogClass]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
          v-show="open"
        >
          <div class="px-4 py-5 sm:px-6" v-if="$slots.header">
            <slot name="header" :close="close" />
          </div>
          <div class="px-4 py-5 sm:p-6 flex-1 overflow-y-auto">
            <slot :close="close" />
          </div>
          <div class="px-4 py-4 sm:px-6" v-if="$slots.footer">
            <slot name="footer" :close="close" />
          </div>
        </div>
      </transition>
      <div v-else :class="[modalClass]">
        <div class="px-4 py-5 sm:px-6" v-if="$slots.header">
          <slot name="header" :close="close" />
        </div>
        <div class="px-4 py-5 sm:p-6 flex-1 overflow-y-auto">
          <slot :close="close" />
        </div>
        <div class="px-4 py-4 sm:px-6" v-if="$slots.footer">
          <slot name="footer" :close="close" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import XModalBackdrop from "./Modal/Backdrop";

export default {
  components: {
    XModalBackdrop,
  },
  props: {
    fullscreen: {
      type: Boolean,
    },
    dismissable: {
      type: Boolean,
    },
    transition: {
      type: Boolean,
      default: true,
    },
    containerClass: {
      type: String,
      default:
        "flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0",
    },
    modalClass: {
      type: String,
      default:
        "inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full divide-y divide-y-gray-200",
    },
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    dialogClass() {
      if (this.fullscreen && !this.transition) {
        return "flex flex-col block left-0 top-0 w-full h-full  divide-y divide-y-gray-200";
      }

      if (this.transition) {
        return this.modalClass;
      }

      return "";
    },
  },
  created() {
    const onEscape = (e) => {
      if (this.open && this.dismissable && e.keyCode === 27) {
        this.close();
      }
    };
    document.addEventListener("keydown", onEscape);
    // this.$on("hook:destroyed", () => {
    //   document.removeEventListener("keydown", onEscape);
    // });
  },
  methods: {
    show() {
      this.open = true;
    },
    close(timeout) {
      if (timeout === undefined) {
        timeout = 0;
      }
      
      setTimeout(() => {
        this.$emit("close");
        this.open = false; 
      }, timeout);
    },
  },
};
</script>
