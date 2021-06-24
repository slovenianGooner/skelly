<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      class="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-10"
      v-show="show"
    >
      <div
        class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
        :class="[toastClass]"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0" v-if="type || $slots.icon">
              <slot name="icon" v-if="$slots.icon"></slot>
              <CheckCircleIcon
                class="w-6 h-6 text-green-400"
                v-else-if="type === 'success'"
              />
              <ExclamationCircleIcon
                class="w-6 h-6 text-red-600"
                v-else-if="type === 'error'"
              />
              <InformationCircleIcon
                class="w-6 h-6 text-blue-500"
                v-else-if="type === 'info'"
              />
            </div>
            <div
              class="w-0 flex-1 pt-0.5"
              :class="[type || $slots.icon ? 'ml-3' : '']"
            >
              <slot />
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                @click="$emit('hidden')"
                class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Close</span>
                <XIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XIcon,
} from "@heroicons/vue/solid";
export default {
  components: {
    CheckCircleIcon,
    ExclamationCircleIcon,
    InformationCircleIcon,
    XIcon,
  },
  props: {
    type: {
      type: String,
      default: null,
    },
    hide: {
      type: [Number, Boolean],
      required: true,
    },
    toastClass: {
      type: String,
    }
  },
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.show = true;
    if (this.hide > 0) {
      setTimeout(() => {
        this.$emit("hidden");
      }, this.hide);
    }
  },
};
</script>
