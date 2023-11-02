<template>
  <div id="contact" ref="contactSection" class="mb-20 sm:mb-28 text-center mx-3" v-if="showSection">
    <div class="text-4xl font-semibold">Contact me</div>

    <p class="mt-6 text-white/80">
      Please contact me directly at
      <a class="underline" href="mailto:example@gmail.com"> Herlambangk25@gmail.com </a>
      or through this form.
    </p>

    <form class="mt-10 flex flex-col dark:text-black" @submit.prevent="submitForm">
      <input
        v-model="formData.senderEmail"
        class="h-10 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none text-black"
        name="senderEmail"
        type="email"
        required
        :maxlength="500"
        placeholder="Your email"
      />
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
        <select
          class="h-10 text-xs font-semibold md:text-lg md:h-14 md:px-4 mt-3 rounded-lg borderBlack bg-white bg-opacity-80 focus:bg-opacity-100 transition-all outline-none text-black"
          v-model="selectedProvince"
          @change="fetchRegencies"
        >
          <option disabled value="">Pilih Provinsi</option>
          <option
            v-for="province in provinces"
            :value="province.id"
            :key="province.id"
            @change="formData.province = province.name"
          >
            {{ province.name }}
          </option>
        </select>
        <select
          class="h-10 text-xs font-semibold md:text-lg md:h-14 md:px-4 mt-3 rounded-lg borderBlack bg-white bg-opacity-80 focus:bg-opacity-100 transition-all outline-none text-black"
          v-model="selectedRegency"
          @change="fetchDistricts"
        >
          <option disabled value="">Pilih Kabupaten</option>
          <option
            v-for="regency in regencies"
            :value="regency.id"
            :key="regency.id"
            @change="formData.regency = regency.name"
          >
            {{ regency.name }}
          </option>
        </select>
        <select
          class="h-10 text-xs font-semibold md:text-lg md:h-14 md:px-4 mt-3 rounded-lg borderBlack bg-white bg-opacity-80 focus:bg-opacity-100 transition-all outline-none text-black"
          v-model="selectedDistrict"
          @change="fetchVillages"
        >
          <option disabled value="">Pilih Kecamatan</option>
          <option
            v-for="district in districts"
            :value="district.id"
            :key="district.id"
            @change="formData.district = district.name"
          >
            {{ district.name }}
          </option>
        </select>
        <select
          class="h-10 text-xs font-semibold md:text-lg md:h-14 md:px-4 mt-3 rounded-lg borderBlack bg-white bg-opacity-80 focus:bg-opacity-100 transition-all outline-none text-black"
          v-model="selectedVillage"
          @change="fetchVillages"
        >
          <option disabled value="">Pilih Desa</option>
          <option
            v-for="village in villages"
            :value="village.id"
            :key="village.id"
            @change="formData.village = village.name"
          >
            {{ village.name }}
          </option>
        </select>
      </div>
      <textarea
        v-model="formData.message"
        class="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none text-black"
        name="message"
        placeholder="Your message"
        required
        :maxlength="5000"
      />
      <button
        class="group flex items-center justify-center bg-white p-5 rounded-lg bg-opacity-10 hover:bg-opacity-20 transition-all"
      >
        Send
      </button>
    </form>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const provinces = ref([])
    const regencies = ref([])
    const districts = ref([])
    const villages = ref([])
    const selectedProvince = ref('')
    const selectedRegency = ref('')
    const selectedDistrict = ref('')
    const selectedVillage = ref('')
    const contactSection = ref(null)
    const showSection = ref(true)
    const formData = reactive({
      senderEmail: '',
      message: '',
      province: '',
      regency: '',
      district: '',
      village: ''
    })

    onMounted(async () => {
      await store.dispatch('fetchProvinces')
      provinces.value = store.getters.getProvinces
      formData.province = provinces.value[0].name
    })

    const fetchRegencies = async () => {
      if (selectedProvince.value) {
        await store.dispatch('fetchRegencies', selectedProvince.value)
        regencies.value = store.getters.getRegencies
        formData.regency = regencies.value[0].name
      }
    }

    const fetchDistricts = async () => {
      if (selectedRegency.value) {
        await store.dispatch('fetchDistricts', selectedRegency.value)
        districts.value = store.getters.getDistricts
        formData.district = districts.value[0].name
      }
    }

    const fetchVillages = async () => {
      if (selectedDistrict.value) {
        await store.dispatch('fetchVillages', selectedDistrict.value)
        villages.value = store.getters.getVillages
        formData.village = villages.value[0].name
      }
    }

    const submitForm = async () => {
      try {
        alert('success, Data terkirim', formData)
        //   const { data, error } = await sendEmail(
        //     formData.senderEmail,
        //     formData.message
        //   );
        console.log('formData', formData)
      } catch (error) {
        console.log(error)
        return
      }
    }

    return {
      contactSection,
      showSection,
      formData,
      submitForm,
      selectedProvince,
      selectedRegency,
      selectedDistrict,
      selectedVillage,
      provinces,
      regencies,
      districts,
      villages,
      fetchRegencies,
      fetchDistricts,
      fetchVillages
    }
  }
}
</script>
