<script setup>
const props = defineProps({
  iconLeft: Object,
  iconRight: Object
})
</script>

<template>
  <button
    class="bg-black text-white text-sm rounded min-h-[32px] px-3 py-0.5 font-semibold hover:bg-gray-800"
  >
    <component :is="props.iconLeft" class="w-5 h-5 mr-2" />
    <slot />
  </button>
</template>
