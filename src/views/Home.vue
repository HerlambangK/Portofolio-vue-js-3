<template>
  <main>
    <el-carousel class="rounded-xl m-3 h-1/2">
      <el-carousel-item v-for="item in items" :key="item">
        <img
          class="h-full w-full object-cover as-card-image"
          :src="item.image"
          loading="lazy"
          alt="Image {{ item.title }}"
        />
      </el-carousel-item>
    </el-carousel>
    <div class="mx-auto max-w-screen-lg px-8 lg:px-1 py-6 mb-8">
      <div class="container lg:pr-8 mb-3">
        <h1
          class="text-5xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 lg:pr-8"
        >
          Hi, I'm Herlambang.
        </h1>

        <div class="flex flex-col lg:flex-row lg:items-center gap-3 mt-6">
          <hr class="w-10 border bg-gray-400" />
          <span class="md:text-md font-medium text-gray-400"> Front End Developer </span>
        </div>
      </div>
      <!-- <Button as="a" href="/about" :icon-left="EnvelopeIcon" :icon-right="EnvelopeIcon" loading -->
      <Button
        as="a"
        href="https://drive.google.com/file/d/1YJn2wOzukXXGytwt8IaQ8vKQgOOTBuCK/view?usp=sharing"
        :icon-left="MagnifyingGlassCircleIcon"
        intent="secondary"
        >Download CV</Button
      >

      <!-- <a
        class="text-black bg-white md:opacity-50 hover:opacity-100 px-7 py-2 items-center rounded-full cursor-pointer borderBlack"
        href="https://drive.google.com/file/d/1YJn2wOzukXXGytwt8IaQ8vKQgOOTBuCK/view?usp=sharing"
      >
        Download CV
      </a> -->
    </div>
    <div class="mx-auto max-w-screen-lg px-8 lg:px-1 py-6">
      <div class="mb-6 text-2xl font-bold">
        <div class="flex items-baseline justify-between">
          <h2 class="mb-6 text-2xl font-bold">
            Recent <span class="text-fuchsia-500">Portofolio</span>
          </h2>
          <div class="text-sm">
            <a href="/about">Know more →</a>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <a :href="item.link" v-for="item in items" :key="item">
          <div class="overflow-hidden rounded-md bg-gray-800">
            <div class="aspect-w-3 aspect-h-2">
              <img
                class="h-full w-full object-cover object-center as-card-image"
                :src="item.image"
                width="315"
                height="240"
                loading="lazy"
                alt="Image {{ item.title }}"
              />
            </div>
            <div class="px-4 pt-5 pb-6">
              <h2 class="text-xl font-semibold">{{ item.title }}</h2>
              <p class="mt-1 text-xs text-gray-400">{{ item.date }}</p>
              <p class="mt-4 text-sm text-gray-300">{{ item.description }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
    <!-- <div class="">Provinsi : {{ Prov.name }}</div> -->
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import Button from '../components/Button.vue'
import { MagnifyingGlassCircleIcon } from '@heroicons/vue/20/solid'

import { ElButton } from 'element-plus'

import { useStore } from 'vuex'

const items = ref([
  {
    title: 'Bembie Resto',
    image: '/img/webPorto/restoweb.png',
    link: '',
    date: 'May 15, 2023',
    description: 'Bembie Resto is a website showcasing restaurant details, including menus.'
  },
  {
    title: 'Quizmify',
    image: '/img/webPorto/quizmify.png',
    link: 'https://quizmify-herlambangk.vercel.app/',
    date: 'Feb 8, 2023',
    description: 'Quizmify is a quiz platform that offers a variety of questions'
  },
  {
    title: 'Niagaweb',
    image: '/img/webPorto/Niagaweb-studycase.png',
    link: 'https://landing-page-niagaweb.vercel.app/',
    date: 'Nov 16, 2022',
    description: 'https://landing-page-niagaweb.vercel.app/'
  }
])

const store = useStore()

// const Prov = computed(() => {
//   console.log(store.getters.getProvinces)
//   console.log(store.state.provinces)
//   return store.getters.getProvinces
// })
</script>

<style scoped>
#app {
  color: red;
  background-color: blue;
}
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}
/* 
.el-carousel__arrow.el-carousel__arrow--left:hover {
  background-color: rgba(184, 21, 21, 0.6) !important;
}

.el-carousel__arrow:hover {
  background-color: rgb(17 116 230 / 63%);
}

.el-carousel__arrow.el-carousel__arrow--left [type='button'],
.el-carousel__arrow.el-carousel__arrow--right [type='button']:hover {
  background-color: red !important;
} */
</style>
