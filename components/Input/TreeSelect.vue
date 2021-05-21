<template>
  <div>
    <!-- before passing in options we need to transform them to see which ones to leave open -->
    <XInputCustomSelect
      :label-resolver="(item) => item.name"
      :value-resolver="valueResolver"
      :children-resolver="childrenResolver"
      :selected-resolver="selectedResolver"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :options="transformedOptions"
    >
      <template #options="{ options, select, isSelected }">
        <XInputTreeSelectOptions
          :items="options"
          :childrenResolver="childrenResolver"
          class="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        >
          <template #default="{ item, toggle }">
            <div class="flex items-center">
              <button
                @click.prevent="toggle(item)"
                v-if="item[childrenResolver].length"
                class="focus:outline-none"
              >
                <ChevronDownIcon class="w-5 h-5 mr-1.5" v-show="item.isOpen" />
                <ChevronRightIcon
                  class="w-5 h-5 mr-1.5"
                  v-show="!item.isOpen"
                />
              </button>
              <div v-else class="w-5 h-5 mr-1.5"></div>
              <button
                class="flex-1 text-left"
                @click.prevent="select(item)"
                :class="[isSelected(item) ? 'font-semibold' : 'font-normal']"
              >
                {{ item.name }}
              </button>
              <span
                v-if="isSelected(item)"
                class="group-hover:text-white text-red-600 pr-4"
              >
                <CheckIcon class="w-5 h-5" />
              </span>
            </div>
          </template>
        </XInputTreeSelectOptions>
      </template>
    </XInputCustomSelect>
  </div>
</template>
<script>
import XInputCustomSelect from "../Input/CustomSelect";
import XInputTreeSelectOptions from "../Input/TreeSelectOptions";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CheckIcon,
} from "@heroicons/vue/outline";
import treeMixin from "../../mixins/tree";

export default {
  components: {
    XInputCustomSelect,
    XInputTreeSelectOptions,
    ChevronRightIcon,
    ChevronDownIcon,
    CheckIcon,
  },
  mixins: [treeMixin],
  data() {
    return {
      transformedOptions: [],
    };
  },
  watch: {
    modelValue: {
      immediate: true,
      handler() {
        if (!this.transformOptions) {
          this.transformedOptions = this.options;
          return;
        }
        
        this.transformedOptions = this.transformAncestors(
          this.options,
          (item) => {
            return this.resolveValue(item) == this.modelValue;
          },
          "id",
          true
        );
      },
    },
  },
  methods: {
    selectedResolver(options, modelValue) {
      return this.findInTree(options, modelValue);
    },
    resolveLabel(option) {
      if (typeof this.labelResolver === "function") {
        return this.labelResolver(option);
      }

      if (typeof this.labelResolver === "string") {
        return option[this.labelResolver];
      }

      return option;
    },
    resolveValue(option) {
      if (typeof this.valueResolver === "function") {
        return this.valueResolver(option);
      }

      if (typeof this.valueResolver === "string") {
        return option[this.valueResolver];
      }

      return option;
    },
  },
  props: {
    transformOptions: {
      type: Boolean,
      default: true
    },
    modelValue: {
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
      required: true,
    },
    labelResolver: {
      default: "name",
    },
    valueResolver: {
      default: "id",
    },
    childrenResolver: {
      default: "children",
      type: String,
    },
  },
};
</script>
