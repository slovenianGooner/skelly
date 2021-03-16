<template>
  <x-button-form
    v-on="$listeners"
    v-bind="{ ...$attrs }"
    class="px-3 py-2 text-sm"
  >
    <slot />
  </x-button-form>
</template>
