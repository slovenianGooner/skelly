<template>
  <div
    class="relative inline-block text-left"
    v-click-away="closeDropdown"
    v-updown
  >
    <div>
      <slot name="button" :toggleDropdown="toggleDropdown" />
    </div>
    <transition
      name="dropdown"
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-show="open"
        class="z-10 absolute mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
        :class="[origin, maxHeight]"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="dropdown"
      >
        <div
          class="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <slot name="links" :toggleDropdown="toggleDropdown" />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { directive } from "vue3-click-away";
export default {
  directives: {
    ClickAway: directive,
    updown: {
      mounted(el, binding, vnode, prevVNode) {
        el.addEventListener("click", () => {
          let space = window.innerHeight - el.getBoundingClientRect().bottom;
          let button = el.children[0].children[0];
          let dropdown = el.children[1];
          let height = Math.max(button.offsetHeight, dropdown.offsetHeight);

          if (space < height) {
            dropdown.classList.add("bottom-0", "transform");
            dropdown.style =
              "transform: translateY(-" + (button.offsetHeight + 4) + "px)";
          } else {
            dropdown.classList.remove("bottom-0", "transform");
            dropdown.style = "transform: translateY(0px)";
          }
        });
      },
    },
  },
  props: {
    origin: {
      type: String,
      default: "origin-top-right right-0",
    },
    maxHeight: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.open = !this.open;
    },
    closeDropdown() {
      this.open = false;
    },
  },
};
</script>
