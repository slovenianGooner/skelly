<template>
  <nav
    class="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between"
    aria-label="Pagination"
    v-if="data.total"
  >
    <div>
      <p class="text-sm text-gray-700">
        <slot name="text" :data="data">
          Showing
          <span class="font-medium">{{ data.from }}</span>
          to
          <span class="font-medium">{{ data.to }}</span>
          of
          <span class="font-medium">{{ data.total }}</span>
          results
        </slot>
      </p>
    </div>

    <slot name="buttons" :data="data">
      <div
        class="flex-1 flex justify-between md:justify-end space-x-2"
        v-if="data.prev_page_url || data.next_page_url || nextPageUrl || prevPageUrl"
      >
        <XButtonForm
          v-if="prevPageUrl || data.prev_page_url"
          @click="
            $emit('change', {
              url: prevPageUrl ?: data.prev_page_url,
              page: data.current_page - 1,
            })
          "
        >
          {{ previous }}
        </XButtonForm>
        <XButtonForm
          v-if="nextPageUrl || data.next_page_url"
          @click="
            $emit('change', {
              url: nextPageUrl ?: data.next_page_url,
              page: data.current_page + 1,
            })
          "
        >
          {{ next }}
        </XButtonForm>
      </div>
    </slot>
  </nav>
</template>
<script>
import XButtonForm from "../Button/Form";

export default {
  components: {
    XButtonForm,
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    previous: {
      type: String,
      default: "Previous",
    },
    next: {
      type: String,
      default: "Next",
    },
    prevPageUrl: {
      type: String,
      default: null
    },
    nextPageUrl: {
      type: String,
      default: null
    }
  },
};
</script>
