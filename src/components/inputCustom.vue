<template>
  <input
    class="py-2 px-4 border border-gray-200 rounded-lg text-black"
    :placeholder="placeholder"
  />
  <button
    @click="$emit('clicked', 'alhi')"
    class="py-2 px-4 rounded-lg m-3 bg-green-400 text-white"
  >
    Send
  </button>
</template>

<script setup>
import { ref } from 'vue'
const placeholder = ref('hallo')
</script>
