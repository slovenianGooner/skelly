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
            <slot name="form" :form="form">
              <slot name="errors">
                <XAlertFormError :errors="errors" />
              </slot>

              <slot name="username">
                <div>
                  <XInputLabel for="username" :errors="errors.username">
                    Username
                  </XInputLabel>
                  <div class="mt-1">
                    <XInputText
                      v-model="form.username"
                      type="text"
                      name="username"
                      :errors="errors.username"
                    />
                    <XInputErrors :errors="errors.username" />
                  </div>
                </div>
              </slot>

              <div>
                <XInputLabel for="password" :errors="errors.password">
                  Password
                </XInputLabel>
                <div class="mt-1">
                  <XInputText
                    v-model="form.password"
                    type="password"
                    :errors="errors.password"
                  />
                  <XInputErrors :errors="errors.password" />
                </div>
              </div>

              <div v-if="$slots.forgotPassword || form.remember !== undefined">
                <div class="flex items-center justify-between mt-4 mb-4">
                  <div class="flex items-center">
                    <input
                      id="remember"
                      name="remember"
                      type="checkbox"
                      v-model="form.remember"
                      class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label
                      for="remember"
                      class="ml-2 block text-sm text-gray-900"
                    >
                      {{ rememberMeTitle }}
                    </label>
                  </div>
                  <div class="text-sm" v-if="$slots.forgotPassword">
                    <slot name="forgotPassword" />
                  </div>
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
                  <LoginIcon class="w-6 h-6 mr-1.5" />
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
import { LoginIcon } from "@heroicons/vue/outline";

export default {
  components: {
    XAlertFormError,
    XInputLabel,
    XInputText,
    XInputErrors,
    LoginIcon,
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
    rememberMeTitle: {
      type: String,
      default: "Remember me",
    },
    errors: {
      type: Object,
      default: () => {
        return {};
      },
    },
    button: {
      type: String,
      default: "Sign In",
    },
    buttonColors: {
      type: String,
      default: "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500",
    },
    data: {
      type: Object,
      default: () => {
        return {
          username: null,
          password: null,
          remember: null,
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
