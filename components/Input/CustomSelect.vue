<template>
  <div class="mt-1 relative" v-on-clickaway="closeMenu" v-updown>
    <button
      @click="toggle"
      type="button"
      ref="button"
      aria-haspopup="listbox"
      aria-expanded="true"
      aria-labelledby="listbox-label"
      class="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
    >
      <slot
        name="selectedLabel"
        :selected="selected"
        v-if="$slots.selectedLabel || $scopedSlots.selectedLabel"
      />
      <span class="block truncate" v-html="resolveSelected()" v-else> </span>
      <span
        class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
      >
        <x-icon-selector class="text-gray-400" size="w-5 h-5" />
      </span>
    </button>

    <div
      class="absolute inset-y-0 right-0 pr-8 flex items-center pointer-events-none"
      v-if="errors.length"
    >
      <x-icon-exclamation-circle
        size="w-5 h-5"
        class="text-red-500"
        viewBox="0 0 20 20"
      />
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
            <x-input-text
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
              <x-icon-check size="w-5 h-5" />
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
              v-if="$slots.label || $scopedSlots.label"
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
              <x-icon-check size="w-5 h-5" />
            </span>
          </li>
        </ul>
      </div>
    </transition>

    <div class="-mt-1" v-if="multiple && value.length > 0" ref="deselect">
      <button
        class="text-xs underline text-gray-700"
        @click="$emit('input', [])"
      >
        {{ deselectAll }}
      </button>
    </div>
  </div>
</template>
<script>
import { mixin as clickaway } from "vue-clickaway";

export default {
  inheritAttrs: false,
  mixins: [clickaway],
  directives: {
    updown: {
      inserted(el, binding, vnode) {
        el.addEventListener("click", () => {
          let space = window.innerHeight - el.getBoundingClientRect().bottom;

          let height = Math.max(vnode.context.$refs.button.offsetHeight);

          if (vnode.context.$refs.dropdown) {
            height += vnode.context.$refs.dropdown.offsetHeight;
          }

          // Button height
          let buttonHeight = vnode.context.$refs.button.offsetHeight + 4;
          if (vnode.context.$refs.deselect !== undefined) {
            buttonHeight += vnode.context.$refs.deselect.offsetHeight - 4;
          }

          if (vnode.context.$refs.dropdown) {
            if (space < height) {
              vnode.context.$refs.dropdown.classList.add(
                "bottom-0",
                "transform"
              );
              vnode.context.$refs.dropdown.style =
                "--tw-translate-y: -" + buttonHeight + "px";
            } else {
              vnode.context.$refs.dropdown.classList.remove(
                "bottom-0",
                "transform"
              );
              vnode.context.$refs.dropdown.style = "--tw-translate-y: 0px";
            }
          }
        });
      },
    },
  },
  props: {
    search: {
      type: Boolean | Function,
    },
    searchPlaceholder: {
      type: String,
      default: "Search...",
    },
    multiple: {
      type: Boolean,
    },
    value: {
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
    errors: {
      type: Array | String,
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
      this.$emit("input", null);
      this.closeMenu();
    },
    select(option) {
      if (this.multiple) {
        let newValue = [...this.value];

        if (this.isSelected(option)) {
          newValue.splice(this.valueIndex(option), 1);
        } else {
          newValue.push(this.resolveValue(option));
        }

        this.$emit("input", newValue);
        return;
      }

      this.$emit("input", this.resolveValue(option));
      this.closeMenu();
    },
    valueIndex(item) {
      if (!this.value instanceof Array) {
        return -1;
      }

      return this.value.indexOf(this.resolveValue(item));
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
        return this.value.indexOf(this.resolveValue(item)) !== -1;
      }
      return this.resolveValue(item) === this.value;
    },
    resolveSelected() {
      if (this.multiple && this.value.length === 0) {
        return this.noOptionsSelected;
      }

      if (this.multiple) {
        return this.selected()
          .map((option) => {
            return this.resolveLabel(option);
          })
          .join(", ");
      }

      if (this.value === this.empty.value) {
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
