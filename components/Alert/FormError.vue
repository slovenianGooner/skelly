<template>
  <div class="rounded-md bg-red-50 p-4" v-if="errorCount">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <ExclamationCircleIcon class="w-6 h-6 text-red-500" />
      </div>
      <div class="ml-3">
        <div class="text-sm text-red-700">
          <ul :class="{ 'list-disc pl-5 space-y-1': errorCount > 1 }">
            <template v-for="group in errors">
              <li v-for="(error, index) in parseGroup(group)" :key="index">
                {{ error }}
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ExclamationCircleIcon } from "@heroicons/vue/24/solid";

export default {
  components: {
    ExclamationCircleIcon,
  },
  props: {
    errors: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    errorCount() {
      return Object.keys(this.errors).length;
    },
  },
  methods: {
    parseGroup(group) {
      if (group instanceof Array) {
        return group;
      }

      return [group];
    },
  },
};
</script>
