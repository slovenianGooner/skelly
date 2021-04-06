<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
    <div :class="[mobileBreakpoint]" v-if="$slots.navigation">
      <div class="fixed inset-0 flex z-40" v-show="sidebarOpen">
        <transition
          name="off-canvas-menu-overlay"
          enter-active-class="transition-opacity ease-linear duration-300"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity ease-linear duration-300"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div class="fixed inset-0" aria-hidden="true" v-show="sidebarOpen">
            <div class="absolute inset-0 bg-gray-600 opacity-90"></div>
          </div>
        </transition>

        <transition
          name="off-canvas-menu-overlay"
          enter-active-class="transition ease-in-out duration-300 transform"
          enter-class="-translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition ease-in-out duration-300 transform"
          leave-class="translate-x-0"
          leave-to-class="-translate-x-full"
        >
          <div
            class="relative flex-1 flex flex-col max-w-xs w-full"
            :class="[sidebarColor]"
            v-show="sidebarOpen"
          >
            <div class="absolute top-0 right-0 -mr-12 pt-2">
              <button
                @click="sidebarOpen = false"
                class="ml-1 flex items-center justify-center h-12 w-10 rounded-full focus:outline-none"
              >
                <span class="sr-only">Close sidebar</span>
                <XIcon class="w-6 h-6 text-white" />
              </button>
            </div>
            <!-- Logo or brand text display -->
            <div
              class="flex items-center flex-shrink-0 px-4 h-16 pr-16"
              :class="[headerColor]"
            >
              <div class="text-2xl font-semibold" :class="[headerTextColor]">
                <slot name="logo" />
              </div>
            </div>

            <!-- navigation -->
            <div class="mt-2 flex-1 h-0 overflow-y-auto">
              <nav class="px-2 space-y-1">
                <slot name="navigation" />
              </nav>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Static sidebar for desktop -->
    <div :class="[desktopBreakpoint]" class="hidden">
      <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex flex-col flex-grow overflow-y-auto">
          <!-- Logo or brand text display -->
          <div
            class="flex items-center flex-shrink-0 px-4 h-16"
            :class="[headerColor]"
          >
            <div class="text-2xl font-semibold" :class="[headerTextColor]">
              <slot name="logo" />
            </div>
          </div>

          <!-- navigation -->
          <div class="pt-2 flex-1 flex flex-col" :class="[sidebarColor]">
            <nav class="flex-1 px-2 space-y-1">
              <slot name="navigation" />
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- main section -->
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <div
        class="relative z-10 flex-shrink-0 flex h-16 shadow"
        :class="[headerColor]"
      >
        <!-- Open sidebar -->
        <button
          v-if="$slots.navigation"
          class="px-4 focus:outline-none"
          @click="sidebarOpen = true"
          :class="[headerTextColor, mobileBreakpoint]"
        >
          <span class="sr-only">Open sidebar</span>
          <MenuIcon class="w-6 h-6" />
        </button>

        <div class="flex-1 px-4 flex justify-end ml-4 md:ml-6">
          <div
            class="flex items-center w-full justify-end"
            v-if="$slots.headerButtons"
          >
            <slot name="headerButtons" />
          </div>
          <!-- User actions dropdown -->
          <div class="ml-3 flex items-center" v-if="userMenu">
            <XButtonDropdown>
              <template #button="{ toggleDropdown }">
                <slot name="userMenuButton" :toggleUserMenu="toggleDropdown">
                  <button
                    class="max-w-xs flex items-center focus:outline-none"
                    :class="[headerTextColor]"
                    id="user-menu"
                    @click="toggleDropdown"
                    aria-haspopup="true"
                  >
                    <UserIcon class="w-6 h-6 mr-1.5" />
                    {{ username }}
                  </button>
                </slot>
              </template>
              <template #links="{ toggleDropdown }">
                <slot name="userMenuLinks" :toggleUserMenu="toggleDropdown">
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    >Sign out</a
                  >
                </slot>
              </template>
            </XButtonDropdown>
          </div>
        </div>
      </div>
      <main
        class="flex-1 relative overflow-y-auto focus:outline-none"
        tabindex="0"
        scroll-region
      >
        <slot name="loading" />
        <slot />
      </main>
    </div>

    <slot name="modal" />
  </div>
</template>
<script>
import XButtonDropdown from "../components/Button/Dropdown";
import { XIcon, MenuIcon } from "@heroicons/vue/solid";
import { UserIcon } from "@heroicons/vue/outline";

export default {
  components: {
    XButtonDropdown,
    XIcon,
    MenuIcon,
    UserIcon,
  },
  props: {
    userMenu: {
      type: Boolean,
      default: true,
    },
    username: {
      type: String,
      default: "John Doe",
    },
    headerColor: {
      type: String,
      default: "bg-red-600",
    },
    headerTextColor: {
      type: String,
      default: "text-white",
    },
    sidebarColor: {
      type: String,
      default: "bg-gray-800",
    },
    mobileBreakpoint: {
      type: String,
      default: "md:hidden",
    },
    desktopBreakpoint: {
      type: String,
      default: "md:flex md:flex-shrink-0",
    },
  },
  data() {
    return {
      sidebarOpen: false,
    };
  },
};
</script>
