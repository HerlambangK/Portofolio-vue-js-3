<template>
  <div class="h-screen mx-auto bg-gray-900 text-white overflow-y-auto">
    <nav class="md:p-2">
      <div class="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <a href="/" aria-label="logo ">
                <img
                  class="w-full h-8 aspect-square"
                  src="/img/Herlambang.webp"
                  loading="eager"
                  width="48"
                  height="32"
                  alt="logo herlambang"
                />
              </a>
            </div>
            <div class="hidden md:block">
              <div class="flex items-baseline ml-10">
                <router-link
                  v-for="(link, i) in links"
                  :key="i"
                  :to="link.to"
                  custom
                  v-slot="{ navigate, href, isExactActive }"
                >
                  <a
                    :href="href"
                    @click="navigate"
                    class="px-3 py-2 text-sm font-medium rounded-md"
                    :class="[
                      isExactActive
                        ? 'text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700',
                      i > 0 && 'ml-4',
                    ]"
                    >{{ link.text }}</a
                  >
                </router-link>
              </div>
            </div>
          </div>

          <div class="flex -mr-2 md:hidden">
            <button
              type="button"
              aria-label="menu"
              class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              @click="showMenu = !showMenu"
            >
              <svg
                class="block w-6 h-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                class="hidden w-6 h-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="md:hidden" :class="showMenu ? 'block' : 'hidden'">
        <div class="px-2 pt-2 pb-3 sm:px-3">
          <router-link
            v-for="(link, i) in links"
            :key="i"
            :to="link.to"
            custom
            v-slot="{ navigate, href, isExactActive }"
          >
            <a
              :href="href"
              @click="navigate().then(() => (showMenu = false))"
              class="block px-3 py-2 text-base font-medium rounded-md"
              :class="[
                isExactActive
                  ? 'text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700',
                i > 0 && 'mt-1',
              ]"
              >{{ link.text }}</a
            >
          </router-link>
        </div>
      </div>
    </nav>

    <div
      class="max-w-screen-xl sm:py-6 mx-auto sm:px-6 lg:px-8 overflow-hidden"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    showMenu: false,
    showProfileMenu: false,
    links: [
      { text: "Home", to: "/" },
      { text: "About", to: "/about" },
      { text: "Portofolio", to: "/portofolio" },
      { text: "Contact", to: "/contact" },
    ],
  }),
});
</script>
