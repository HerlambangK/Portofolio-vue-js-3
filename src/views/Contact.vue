<template>
  <Alert title="Horaay!" intent="success" :show="showAlert" :on-dismiss="() => (showAlert = false)">
    Email Sent Succecessfully. Keep doing it!
  </Alert>
  <div id="contact" ref="contactSection" class="mb-20 sm:mb-28 text-center mx-3">
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
            @change="handleProvince"
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
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
import Alert from '../components/Alert.vue'

export default {
  components: {
    Alert
  },
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
    // const showSection = ref(true)
    const showAlert = ref(false)
    const formData = reactive({
      senderEmail: '',
      message: '',
      province: '',
      regency: '',
      district: '',
      village: ''
    })

    // onMounted(async () => {
    //   await store.dispatch('fetchProvinces')
    //   provinces.value = store.getters.getProvinces
    //   console.log('provinces:', selectedProvince)
    //   // formData.province = selectedProvinceName
    //   handleProvince(selectedProvince)
    // })

    onMounted(async () => {
      fetchProvinces()
    })

    const fetchProvinces = async () => {
      await store.dispatch('fetchProvinces')
      provinces.value = store.getters.getProvinces
    }

    const selectedProvinceName = computed(() => {
      const provinceId = selectedProvince.value
      const selected = provinces.value.find((province) => province.id === provinceId)
      // console.log('provinceId :', provinceId)
      // console.log('selected :', selected)
      store.commit('setProvinces', selected)
      return selected ? selected.name : ''
    })

    watch(
      () => selectedProvinceName.value,
      (newProvinceName) => {
        formData.province = newProvinceName
      }
    )

    const fetchRegencies = async () => {
      if (selectedProvince.value) {
        await store.dispatch('fetchRegencies', selectedProvince.value)
        regencies.value = store.getters.getRegencies
      }
    }

    const selectedRegenciesName = computed(() => {
      const regenciesId = selectedRegency.value
      const selected = regencies.value.find((regencies) => regencies.id === regenciesId)
      return selected ? selected.name : ''
    })

    watch(
      () => selectedRegenciesName.value,
      (newRegencyName) => {
        formData.regency = newRegencyName
      }
    )

    const fetchDistricts = async () => {
      if (selectedRegency.value) {
        await store.dispatch('fetchDistricts', selectedRegency.value)
        districts.value = store.getters.getDistricts
      }
    }

    const selectedDistrictsName = computed(() => {
      const districtsId = selectedDistrict.value
      const selected = districts.value.find((district) => district.id === districtsId)
      return selected ? selected.name : ''
    })

    watch(
      () => selectedDistrictsName.value,
      (newDistrictsName) => {
        formData.district = newDistrictsName
      }
    )

    const fetchVillages = async () => {
      if (selectedDistrict.value) {
        await store.dispatch('fetchVillages', selectedDistrict.value)
        villages.value = store.getters.getVillages
      }
    }

    const selectiedVillageName = computed(() => {
      const villageId = selectedVillage.value
      const selected = villages.value.find((village) => village.id === villageId)
      return selected ? selected.name : ''
    })

    watch(
      () => selectiedVillageName.value,
      (newVillageName) => {
        formData.village = newVillageName
      }
    )

    const submitForm = async () => {
      try {
        showAlert.value = true
        console.log(formData)
        // alert('Data terkirim: ' + JSON.stringify(formData, null, 2))
      } catch (error) {
        console.error(error)
      }
    }

    return {
      contactSection,
      // showSection,
      showAlert,
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
