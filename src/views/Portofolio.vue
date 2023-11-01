<template>
  <header>
    <div class="max-w-screen-xl py-6 mx-auto px-8 lg:px-0">
      <h1 class="text-3xl font-bold leading-tight text-gray-100">
        My
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 lg:pr-8"
          >Portofolio</span
        >
      </h1>
      <hr class="w-5 border bg-gray-400" />
    </div>
  </header>
  <div class="max-w-screen-lg px-8 lg:px-1 py-8">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <a :href="item.link" v-for="item in items">
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
            <ul class="flex flex-wrap gap-2 sm:mt-auto">
              <li
                v-for="(tag, index) in item.tags"
                :key="index"
                class="bg-black/[0.7] px-3 py-1 text-[0.5rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
              >
                {{ tag }}
              </li>
            </ul>
            <h2 class="text-xl font-semibold">{{ item.title }}</h2>

            <p class="mt-4 text-sm text-gray-300">{{ item.description }}</p>
            <div class="flex items-center justify-between md:col-span-1">
              <button
                v-if="item.linkGithub"
                class="flex items-center mt-3 h-[1.5rem] w-[5rem] md:w-[5rem] text-white rounded-full outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 bg-white bg-opacity-10 disabled:scale-100 disabled:bg-opacity-65"
                @click="window.open(item.linkGithub, '_blank')"
              >
                <BsGithub class="mr-2 ml-2 h-3 w-3" />
                <span class="text-[8px] md:text-[10px]">Github</span>
              </button>
              <button
                v-if="item.priview"
                class="flex items-center mt-3 h-[1.5rem] w-[5rem] md:w-[5rem] text-white rounded-full outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 bg-white bg-opacity-10 disabled:scale-100 disabled:bg-opacity-65"
                @click="window.open(item.priview, '_blank')"
              >
                <BsGithub class="mr-2 ml-2 h-3 w-3" />
                <span class="text-[8px] md:text-[10px]">Priview</span>
              </button>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
  {
    title: "Bembie Resto",
    image: "/img/webPorto/restoweb.png",
    linkGithub: "https://github.com/HerlambangK/Restoran-Kita",
    priview: "https://61ab76b6238b9566f4153916--restobembi.netlify.app/",
    description:
      "Bembie Pokedex is a web app showing pokemon and user can get detail pokemon",
    tags: ["HTML", "Css", "Javascript", "Webpack", "Karma", "Jasmine"],
  },
  {
    title: "PokeDex",
    image: "/img/webPorto/pokedex.png",
    linkGithub: "https://github.com/HerlambangK/pokedex",
    priview: "https://bembiepokedex.netlify.app/",
    description:
      "Bembie Pokedex is a web app showing pokemon and user can get detail pokemon",
    tags: ["React"],
  },
  {
    title: "Quizmify",
    image: "/img/webPorto/quizmify.png",
    linkGithub: "https://github.com/HerlambangK/Quizymify",
    priview: "https://quizmify-herlambangk.vercel.app/",
    description:
      "Quizmify is a quiz platform that offers a variety of questions",
    tags: ["Next Js", "TypeScript", "Prisma", "Tailwind", "ChatGPT", "Vercel"],
  },
  {
    title: "Niagaweb",
    image: "/img/webPorto/Niagaweb-studycase.png",
    linkGithub: "https://github.com/HerlambangK/big-project",
    priview: "https://landing-page-niagaweb.vercel.app/",
    description:
      "Platform is a case study of creating an order system interface for users who want to easily customize and order a website.",
    tags: ["Next Js", "TypeScript", "Prisma", "Tailwind", "ChatGPT", "Vercel"],
  },
]);
</script>
