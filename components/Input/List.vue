<template>
  <div class="space-y-4">
    <div class="space-y-4" v-if="items.length">
      <div
        v-for="(item, index) in items"
        :key="item.uid"
        :class="{
          'border border-gray-300 rounded-lg divide-y divide-gray-300': !simple,
        }"
      >
        <div v-if="header && !simple" class="flex items-center">
          <div class="border-r border-gray-300 p-2">
            <a href="#" @click.prevent="toggle(index)" class="text-gray-700">
              <MinusIcon v-if="item.open" class="w-5 h-5" />
              <PlusIcon v-else class="w-5 h-5" />
            </a>
          </div>
          <div class="px-4 text-gray-700 font-semibold">#{{ index + 1 }}</div>
        </div>
        <div
          v-if="item.open"
          class="flex"
          :class="{ 'space-x-2 items-center': simple }"
        >
          <div
            :class="{
              'border-r border-gray-300 py-4 px-2 space-y-4 text-gray-700 flex flex-col': !simple,
            }"
          >
            <a
              href="#"
              v-if="index > 0 && !simple"
              @click.prevent="moveUp(index)"
            >
              <ArrowUpIcon class="w-5 h-5" />
            </a>
            <a
              href="#"
              v-if="index < items.length - 1 && !simple"
              @click.prevent="moveDown(index)"
            >
              <ArrowDownIcon class="w-5 h-5" />
            </a>
            <a href="#" @click.prevent="removeItem(index)">
              <TrashIcon class="w-5 h-5" />
            </a>
          </div>
          <div
            :class="{ 'px-4 py-6 sm:px-6 flex-1': !simple, 'w-full': simple }"
          >
            <slot :item="item" :index="index" :extra-data="extraData" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center space-x-2" v-if="!disableAdding">
      <XButtonForm size="sm" @click="add">
        <PlusIcon class="w-5 h-5 mr-1.5" />
        {{ addNew }}
      </XButtonForm>
      <div v-if="$slots.buttons">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>
<script>
import { nanoid } from "nanoid";
import XButtonForm from "../Button/Form";
import {
  PlusIcon,
  MinusIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/vue/solid";
import { TrashIcon } from "@heroicons/vue/outline";
export default {
  components: {
    XButtonForm,
    PlusIcon,
    MinusIcon,
    ArrowUpIcon,
    ArrowDownIcon,
    TrashIcon,
  },
  props: {
    collapsed: {
      type: Boolean,
      default: true,
    },
    header: {
      type: Boolean,
      default: true,
    },
    addNew: {
      type: String,
      default: "Add new",
    },
    disableAdding: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Array,
      required: true,
    },
    default: {
      type: Object,
    },
    assignMissingProps: {
      type: Boolean,
      default: false,
    },
    simple: {
      type: Boolean,
    },
    extraData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    items: {
      deep: true,
      handler() {
        this.$emit("update:modelValue", this.items);
      },
    },
  },
  data() {
    return {
      items: this.modelValue,
    };
  },
  created() {
    // If the items don't have a UID then assign it
    this.items = this.items.map((item) => {
      if (this.assignMissingProps) {
        Object.keys(this.default).forEach((key, value) => {
          if (item[key] === undefined) {
            item[key] = this.default[key];
          }
        });
      }

      if (item.uid === undefined) {
        item.uid = nanoid();
      }

      item.open = !this.collapsed;
      return item;
    });
  },
  methods: {
    toggle(index) {
      let items = [...this.items];
      items[index].open = !items[index].open;
      this.items = items;
    },
    add() {
      this.items.push({
        ...this.default,
        uid: nanoid(),
        open: !this.collapsed,
      });
    },
    moveUp(index) {
      if (index > 0) {
        this.items = this.moveItemsInArray([...this.items], index, index - 1);
      }
    },
    moveDown(index) {
      if (index < this.items.length - 1) {
        this.items = this.moveItemsInArray([...this.items], index, index + 1);
      }
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
    moveItemsInArray(array, oldIndex, newIndex) {
      if (newIndex >= array.length) {
        var k = newIndex - array.length + 1;
        while (k--) {
          array.push(undefined);
        }
      }
      array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
      return array;
    },
  },
};
</script>
