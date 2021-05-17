<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div>
      <slot name="header">
        <h1 class="text-center text-xl font-extrabold" :class="[titleColors]">
          {{ title }}
        </h1>
        <h2
          class="mt-1 text-center text-3xl font-extrabold"
          :class="[subtitleColors]"
        >
          {{ subtitle }}
        </h2>
      </slot>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div>
          <form
            class="space-y-2"
            action="#"
            method="POST"
            @submit.prevent="$emit('sent', form)"
          >
            <slot name="form">
              <slot name="errors">
                <XAlertFormError :errors="errors" />
              </slot>

              <slot name="email" :form="form">
                <div>
                  <XInputLabel for="email" :errors="errors.email">
                    E-mail
                  </XInputLabel>
                  <div class="mt-1">
                    <XInputText
                      v-model="form.email"
                      type="email"
                      :errors="errors.email"
                    />
                    <XInputErrors :errors="errors.email" />
                  </div>
                </div>
              </slot>

              <div class="flex items-center justify-between">
                <div class="text-sm" v-if="$slots.forgotPassword">
                  <slot name="forgotPassword" />
                </div>
              </div>
            </slot>

            <slot name="button">
              <div>
                <button
                  type="submit"
                  class="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
                  :class="[buttonColors]"
                >
                  {{ button }}
                </button>
              </div>
            </slot>

            <slot name="footer"></slot>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import XAlertFormError from "../Alert/FormError";
import XInputLabel from "../Input/Label";
import XInputText from "../Input/Text";
import XInputErrors from "../Input/Errors";

export default {
  components: {
    XAlertFormError,
    XInputLabel,
    XInputText,
    XInputErrors,
  },
  props: {
    title: {
      type: String,
    },
    titleColors: {
      type: String,
      default: "text-gray-700",
    },
    subtitle: {
      type: String,
      default: "Sign in to your account",
    },
    subtitleColors: {
      type: String,
      default: "text-red-600",
    },
    errors: {
      type: Object,
      default: () => {
        return {};
      },
    },
    button: {
      type: String,
      default: "Send Reset Password Link",
    },
    buttonColors: {
      type: String,
      default: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
    },
    data: {
      type: Object,
      default: () => {
        return {
          email: null,
        };
      },
    },
  },
  data() {
    return {
      form: this.data,
    };
  },
};
</script>
