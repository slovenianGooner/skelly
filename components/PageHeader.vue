<template>
  <div>
    <div v-if="breadcrumbs.length">
      <slot name="breadcrumbs">
        <nav class="sm:hidden" aria-label="Back">
          <a
            href="#"
            @click.prevent="
              $emit('back', breadcrumbs[breadcrumbs.length - 1].href)
            "
            class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ChevronLeftIcon
              class="w-5 h-5 flex-shrink-0 -ml-1 mr-1 text-gray-400"
            />
            {{ breadcrumbs.length > 1 ? back : breadcrumbs[0].title }}
          </a>
        </nav>
        <nav class="hidden sm:flex" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2">
            <template v-for="(breadcrumb, index) in breadcrumbs" :key="index">
              <li>
                <div class="flex items-center">
                  <ChevronRightIcon
                    class="w-5 h-5 flex-shrink-0 text-gray-400"
                    v-if="index > 0"
                  />
                  <a
                    href="#"
                    @click.prevent="$emit('navigate', breadcrumb.href)"
                    class="text-sm font-medium text-gray-500 hover:text-gray-700"
                    :class="{ 'ml-2': index > 0 }"
                    >{{ breadcrumb.title }}</a
                  >
                </div>
              </li>
            </template>
          </ol>
        </nav>
      </slot>
    </div>
    <div
      class="md:flex md:items-center md:justify-between"
      :class="{ 'mt-2': breadcrumbs.length }"
    >
      <div class="flex-1 min-w-0">
        <h2
          class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate"
        >
          {{ title }}
        </h2>
      </div>
      <div
        class="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4"
        v-if="$slots.buttons"
      >
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";
export default {
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  props: {
    back: {
      type: String,
      default: "Back",
    },
    title: {
      type: String,
      required: true,
    },
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
