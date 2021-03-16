<template>
  <x-button-link
    v-on="$listeners"
    v-bind="{ ...$attrs }"
    class="px-4 py-2 text-base"
  >
    <slot />
  </x-button-link>
</template>
