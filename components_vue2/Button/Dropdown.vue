<template>
  <div
    class="relative inline-block text-left"
    v-on-clickaway="closeDropdown"
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
        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
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
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  directives: {
    updown: {
      inserted(el, binding, vnode) {
        el.addEventListener("click", () => {
          let space = window.innerHeight - el.getBoundingClientRect().bottom;

          let height = Math.max(
            el.children[0].offsetHeight,
            el.children[1].offsetHeight
          );

          if (space < height) {
            el.children[1].classList.add("bottom-0", "transform");
            el.children[1].style =
              "--tw-translate-y: -" + (el.children[0].offsetHeight + 4) + "px";
          } else {
            el.children[1].classList.remove("bottom-0", "transform");
            el.children[1].style = "--tw-translate-y: 0px";
          }
        });
      },
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
