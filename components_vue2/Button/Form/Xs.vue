<template>
  <x-button-form
    v-on="$listeners"
    v-bind="{ ...$attrs }"
    class="px-2.5 py-1.5 text-xs"
  >
    <slot />
  </x-button-form>
</template>
