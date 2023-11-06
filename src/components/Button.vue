<script setup>
import { computed } from 'vue'
import { cva } from 'class-variance-authority'

const props = defineProps({
  iconLeft: Object,
  iconRight: Object,
  loading: Boolean,
  disable: Boolean,
  as: {
    type: [String, Object],
    default: 'button'
  },
  intent: {
    type: String,
    validator: (val) => ['primary', 'secondary', 'danger', 'text'].includes(val),
    default: 'primary'
  }
})

const buttonClass = computed(() => {
  return cva(
    'inline-flex items-center justify-center text-sm rounded min-h-[32px] px-3 py-0.5 font-semibold ',
    {
      variants: {
        intent: {
          primary: 'bg-black text-white hover:bg-gray-800',
          secondary:
            'bg-white text-black  md:opacity-70 hover:opacity-100 hover:shadow-md hover:shadow-blue-500 transition duration-300',
          danger: 'bg-red-600 text-white hover:bg-red-500',
          text: 'bg-transparent text-gray-700 hover:bg-black/5'
        },
        disable: {
          true: '!bg-gray-100 !text-gray-400 cursor-not-allowed '
        }
      }
    }
  )({
    intent: props.intent
  })
})
</script>

<template>
  <component :is="props.as" :class="buttonClass" :disable="props.disable">
    <svg
      v-if="props.loading"
      class="animate-spin h-5 w-5 absolute"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    <component
      :is="props.iconLeft"
      :class="['w-5 h-5 mr-2', props.loading && 'invisible']"
      v-if="!props.loading"
    />

    <span :class="[props.loading && 'invisible']">
      <slot />
    </span>
    <component :is="props.iconRight" :class="['w-5 h-5 mr-2', props.loading && 'invisible']" />
  </component>
</template>
