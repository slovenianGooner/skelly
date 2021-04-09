<template>
  <div
    class="mt-1 relative"
    v-click-away="closeMenu"
    v-updown
    @keyup.down="moveDown('down')"
    @keyup.up="moveUp('up')"
    @keyup.enter="select(this.filteredOptions[cursor])"
  >
    <XInputText
      v-model="inputValue"
      @input="open = true"
      @focus="open = true"
      :placeholder="placeholder"
      ref="input"
    />
    <transition
      enter-active-class=""
      enter-class=""
      enter-to-class=""
      leave-active-class="transition ease-in duration-100"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        class="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10"
        ref="dropdown"
        v-if="open"
      >
        <ul
          tabindex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-item-3"
          class="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        >
          <li
            role="option"
            class="group cursor-default select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-red-600 cursor-pointer"
            :class="[
              cursor === index ? 'bg-red-600 text-white' : 'text-gray-900',
            ]"
            v-for="(option, index) in filteredOptions"
            :key="index"
            @click="select(option)"
          >
            <slot
              name="label"
              v-if="$slots.label"
              :resolve-label="resolveLabel"
              :option="option"
              :index="index"
            />
            <span v-else class="block truncate font-normal">
              {{ resolveLabel(option) }}
            </span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
import XInputText from "./Text";
import { directive } from "vue3-click-away";

export default {
  components: {
    XInputText,
  },
  directives: {
    ClickAway: directive,
    updown: {
      mounted(el, binding, vnode, prevVNode) {
        el.addEventListener("click", () => {
          let space = window.innerHeight - el.getBoundingClientRect().bottom;
          let button = el.children[0];
          let dropdown = el.children[1];
          let deselect = el.children[2];
          let height = Math.max(button.offsetHeight);

          if (dropdown) {
            height += dropdown.offsetHeight;
          }

          // Button height
          let buttonHeight = button.offsetHeight + 4;
          if (deselect !== undefined) {
            buttonHeight += deselect.offsetHeight - 4;
          }

          if (dropdown) {
            if (space < height) {
              dropdown.classList.add("bottom-0", "transform");
              dropdown.style = "--tw-translate-y: -" + buttonHeight + "px";
            } else {
              dropdown.classList.remove("bottom-0", "transform");
              dropdown.style = "--tw-translate-y: 0px";
            }
          }
        });
      },
    },
  },
  props: {
    modelValue: {
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    search: {
      type: [Boolean, Function],
    },
    labelResolver: {
      default: null,
    },
    valueResolver: {
      default: null,
    },
  },
  created() {
    this.optionsList = this.options;
    this.filteredOptions = this.filterOptions();
  },
  data() {
    return {
      cursor: -1,
      optionsList: [],
      inputValue: this.modelValue ?? "",
      filteredOptions: [],
      open: false,
    };
  },
  watch: {
    inputValue() {
      this.cursor = -1;
      this.$emit("update:modelValue", this.inputValue);
      this.filteredOptions = this.filterOptions();
    },
  },
  methods: {
    moveUp(event) {
      if (this.cursor > 1) {
        this.cursor--;
        this.$el.getElementsByTagName("li")[this.cursor].scrollIntoView(false);
      }
    },
    moveDown(event) {
      if (!this.open) {
        this.open = true;
        this.cursor = 0;
        return;
      }

      if (this.cursor < this.filteredOptions.length - 1) {
        this.cursor++;
        this.$el.getElementsByTagName("li")[this.cursor].scrollIntoView(false);
      }
    },
    select(option) {
      this.inputValue = this.resolveValue(option);
      this.$el.children[0].children[0].focus();
      this.cursor = -1;
      this.closeMenu();
    },
    filterOptions() {
      // If search prop is a boolean, then search by default label resolver
      if (typeof this.search === "boolean") {
        return [...this.optionsList].filter((option) => {
          return (
            this.resolveLabel(option)
              .toLowerCase()
              .search(this.inputValue.toLowerCase()) > -1
          );
        });
      }

      if (typeof this.search === "function") {
        return [...this.optionsList].filter((option) => {
          return this.search(option, this.inputValue);
        });
      }

      return this.optionsList;
    },
    closeMenu() {
      this.open = false;
    },
    resolveValue(item, index) {
      if (typeof this.valueResolver === "function") {
        return this.valueResolver(item);
      }

      if (this.valueResolver) {
        return item[this.valueResolver];
      }

      return item;
    },
    resolveLabel(item) {
      if (typeof this.labelResolver === "function") {
        return this.labelResolver(item);
      }

      if (this.labelResolver) {
        return item[this.labelResolver];
      }

      return item;
    },
  },
};
</script>
