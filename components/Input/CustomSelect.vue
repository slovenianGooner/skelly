<template>
  <div class="mt-1 relative" v-click-away="closeMenu" v-updown>
    <button
      @click="toggle"
      type="button"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
      class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
      :class="[buttonClass]"
    >
      <slot
        name="selectedLabel"
        :selected="selected"
        v-if="$slots.selectedLabel"
      />
      <span class="block truncate" v-html="resolveSelected()" v-else> </span>
      <span
        class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
      >
        <SelectorIcon class="text-gray-400 w-5 h-5" />
      </span>
    </button>

    <div
      class="absolute inset-y-0 right-0 pr-8 flex items-center pointer-events-none"
      v-if="errors.length"
    >
      <ExclamationCircleIcon class="w-5 h-5 text-red-500" />
    </div>

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
            class="group text-gray-900 cursor-default select-none relative py-2 px-3 cursor-pointer"
            v-if="search"
          >
            <XInputText
              :placeholder="searchPlaceholder"
              v-model="searchQuery"
            />
          </li>
          <li
            role="option"
            class="group text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-red-600 cursor-pointer"
            v-if="!searchQuery && !multiple && empty && empty.title"
            @click="selectEmpty()"
          >
            <span
              class="block truncate"
              :class="[isSelected(empty) ? 'font-semibold' : 'font-normal']"
              v-html="empty.title"
            >
            </span>

            <span
              v-if="isSelected(empty)"
              class="group-hover:text-white text-red-600 absolute inset-y-0 right-0 flex items-center pr-4"
            >
              <CheckIcon class="w-5 h-5" />
            </span>
          </li>
          <li
            role="option"
            class="group text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:text-white hover:bg-red-600 cursor-pointer"
            v-for="(option, index) in filteredOptions()"
            :key="index"
            @click="select(option)"
          >
            <slot
              name="label"
              v-if="$slots.label"
              :resolve-label="resolveLabel"
              :is-selected="isSelected"
              :option="option"
              :index="index"
            />
            <span
              v-else
              class="block truncate"
              :class="[isSelected(option) ? 'font-semibold' : 'font-normal']"
            >
              {{ resolveLabel(option) }}
            </span>

            <span
              v-if="isSelected(option)"
              class="group-hover:text-white text-red-600 absolute inset-y-0 right-0 flex items-center pr-4"
            >
              <CheckIcon class="w-5 h-5" />
            </span>
          </li>
        </ul>
      </div>
    </transition>

    <div class="-mt-1" v-if="multiple && modelValue.length > 0" ref="deselect">
      <button
        class="text-xs underline text-gray-700"
        @click="$emit('update:modelValue', [])"
      >
        {{ deselectAll }}
      </button>
    </div>
  </div>
</template>
<script>
import { directive } from "vue3-click-away";
import {
  SelectorIcon,
  ExclamationCircleIcon,
  CheckIcon,
} from "@heroicons/vue/solid";
import XInputText from "./Text";

export default {
  components: {
    SelectorIcon,
    ExclamationCircleIcon,
    CheckIcon,
    XInputText,
  },
  //   inheritAttrs: false,
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
    search: {
      type: [Boolean, Function],
    },
    searchPlaceholder: {
      type: String,
      default: "Search...",
    },
    multiple: {
      type: Boolean,
    },
    modelValue: {
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
    errors: {
      type: [Array, String],
      default: () => [],
    },
    empty: {
      type: Object,
      default: () => {
        return {
          value: null,
          title: "&mdash;",
        };
      },
    },
    buttonClass: {
      type: String,
      default: "",
    },
    labelResolver: {
      default: null,
    },
    valueResolver: {
      default: null,
    },
    noOptionsSelected: {
      type: String,
      default: "No options selected",
    },
    deselectAll: {
      type: String,
      default: "Deselect all",
    },
  },
  data() {
    return {
      open: false,
      optionsList: [],
      searchQuery: "",
    };
  },
  created() {
    this.optionsList = this.options;
  },
  methods: {
    filteredOptions() {
      // If search prop is a boolean, then search by default label resolver
      if (typeof this.search === "boolean") {
        return [...this.optionsList].filter((option) => {
          return (
            this.resolveLabel(option)
              .toLowerCase()
              .search(this.searchQuery.toLowerCase()) > -1
          );
        });
      }

      if (typeof this.search === "function") {
        return [...this.optionsList].filter((option) => {
          return this.search(option, this.searchQuery);
        });
      }

      return this.optionsList;
    },
    toggle() {
      this.open = !this.open;
      this.searchQuery = "";
    },
    closeMenu() {
      this.open = false;
      this.searchQuery = "";
    },
    selectEmpty(option) {
      this.$emit("update:modelValue", null);
      this.closeMenu();
    },
    select(option) {
      if (this.multiple) {
        let newValue = [...this.modelValue];

        if (this.isSelected(option)) {
          newValue.splice(this.valueIndex(option), 1);
        } else {
          newValue.push(this.resolveValue(option));
        }

        this.$emit("update:modelValue", newValue);
        return;
      }

      this.$emit("update:modelValue", this.resolveValue(option));
      this.closeMenu();
    },
    valueIndex(item) {
      if (!this.modelValue instanceof Array) {
        return -1;
      }

      return this.modelValue.indexOf(this.resolveValue(item));
    },
    selected() {
      let selected = this.optionsList.filter((option) => {
        return this.isSelected(option);
      });

      if (this.multiple) {
        return selected;
      }

      return selected.length > 0 ? selected[0] : this.empty;
    },
    isSelected(item) {
      if (this.multiple) {
        return this.modelValue.indexOf(this.resolveValue(item)) !== -1;
      }
      return this.resolveValue(item) === this.modelValue;
    },
    resolveSelected() {
      if (this.multiple && this.modelValue.length === 0) {
        return this.noOptionsSelected;
      }

      if (this.multiple) {
        return this.selected()
          .map((option) => {
            return this.resolveLabel(option);
          })
          .join(", ");
      }

      if (this.modelValue === this.empty.value) {
        return this.empty.title;
      }

      return this.resolveLabel(this.selected());
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
