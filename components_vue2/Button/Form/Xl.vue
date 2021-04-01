<template>
  <x-button-form
    v-on="$listeners"
    v-bind="{ ...$attrs }"
    class="px-6 py-3 text-base"
  >
    <slot />
  </x-button-form>
</template>
