<template>
  <Alert
    title="Horaay!"
    intent="success"
    :formData="formData"
    :show="showAlert"
    :on-dismiss="() => (showAlert = false)"
  >
    Email Sent Succecessfully. Keep doing it!
  </Alert>
  <div id="contact" ref="contactSection" class="mb-20 sm:mb-28 text-center mx-3">
    <div class="text-4xl font-semibold">Pengaduan Form</div>

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

      <input
        v-model="formData.noNIK"
        class="h-10 px-4 rounded-lg mt-4 text-black"
        name="noNIK"
        type="number"
        required
        :maxlength="16"
        :rules="rules.isNikValid"
        placeholder="Nomor NIK"
      />
      <input
        v-model="formData.noKK"
        class="h-10 px-4 rounded-lg mt-4 text-black"
        name="noKK"
        type="number"
        required
        :maxlength="16"
        :rules="rules.isNikValid"
        placeholder="Nomor KK"
      />

      <div class="flex">
        <label
          class="w-[15%] h-10 text-sm md:text-lg mt-4 mb-1 bg-white text-slate-400 rounded-md mr-1 items-start"
          for="senderFileNIK"
          >Your NIK</label
        >
        <div class="w-[85%]">
          <input
            @change="handleNikFile"
            class="mt-4 p-1 w-full bg-white rounded-lg dark:bg-white dark:bg-opacity-80 transition-all dark:outline-none text-black"
            name="senderFileNIK"
            ref="senderFileNIK"
            accept=".png, .jpeg, .jpg, .bmp, "
            type="file"
            placeholder="Your NIK"
          />
        </div>
        <ul class="inline-flex flex-wrap gap-2 ml-2">
          <li class="limited-text" v-for="file in formData.nikFile" :key="file.name">
            {{ file.name }}
            <img
              class="w-20 h-20 rounded-lg object-cover"
              loading="lazy"
              :src="file.preview"
              alt="File Preview"
              v-if="file.preview"
            />
          </li>
        </ul>
      </div>

      <div class="flex">
        <label
          class="w-[15%] h-10 mt-4 mb-1 text-sm md:text-lg bg-white text-slate-400 rounded-md mr-1"
          for="senderFileNIK"
          >Kartu Keluarga
        </label>
        <div class="w-[85%]">
          <input
            @change="handleKKFile"
            class="mt-4 p-1 w-full bg-white rounded-lg text-black"
            name="senderFileNIK"
            ref="senderFileNIK"
            accept=".png, .jpeg, .jpg, .bmp, "
            type="file"
            multiple
            placeholder="Your NIK"
          />
        </div>
        <ul class="inline-flex flex-wrap gap-2 ml-2">
          <li class="limited-text" v-for="file in formData.kkFile" :key="file.name">
            {{ file.name }}
            <img
              class="w-20 h-20 rounded-lg object-cover"
              loading="lazy"
              :src="file.preview"
              alt="File Preview"
              v-if="file.preview"
            />
          </li>
        </ul>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
        <select
          class="h-10 text-xs font-semibold md:text-lg md:h-14 md:px-4 mt-3 rounded-lg borderBlack bg-white bg-opacity-80 focus:bg-opacity-100 transition-all outline-none text-black"
          v-model="selectedProvince"
          @change="fetchRegencies"
        >
          <option disabled value="">Pilih Provinsi</option>
          <option v-for="province in provinces" :value="province.id" :key="province.id">
            {{ province.name }}
          </option>
        </select>
        <select
          class="h-10 text-xs font-semibold md:text-lg md:h-14 md:px-4 mt-3 rounded-lg borderBlack bg-white bg-opacity-80 focus:bg-opacity-100 transition-all outline-none text-black"
          v-model="selectedRegency"
          @change="fetchDistricts"
        >
          <option disabled value="">Pilih Kabupaten</option>
          <option v-for="regency in regencies" :value="regency.id" :key="regency.id">
            {{ regency.name }}
          </option>
        </select>
        <select
          class="h-10 text-xs font-semibold md:text-lg md:h-14 md:px-4 mt-3 rounded-lg borderBlack bg-white bg-opacity-80 focus:bg-opacity-100 transition-all outline-none text-black"
          v-model="selectedDistrict"
          @change="fetchVillages"
        >
          <option disabled value="">Pilih Kecamatan</option>
          <option v-for="district in districts" :value="district.id" :key="district.id">
            {{ district.name }}
          </option>
        </select>
        <select
          class="h-10 text-xs font-semibold md:text-lg md:h-14 md:px-4 mt-3 rounded-lg borderBlack bg-white bg-opacity-80 focus:bg-opacity-100 transition-all outline-none text-black"
          required
          v-model="selectedVillage"
          @change="fetchVillages"
        >
          <option disabled value="">Pilih Desa</option>
          <option v-for="village in villages" :value="village.id" :key="village.id">
            {{ village.name }}
          </option>
        </select>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-2 gap-2">
        <input
          v-model="formattedBeforePandemic"
          class="h-10 px-4 rounded-lg mt-4 text-black"
          name="beforePandemic"
          type="text"
          required
          :maxlength="12"
          placeholder="Sallary Before Pandemic"
        />
        <!-- <p>Hasil: {{ formData.beforePandemic }}</p> -->
        <input
          v-model="formattedAfterPandemic"
          class="h-10 px-4 rounded-lg mt-4 text-black"
          name="afterPandemic"
          type="text"
          required
          :maxlength="12"
          placeholder="Sallary After Pandemic"
        />
        <!-- <p>Hasil: {{ formData.afterPandemic }}</p> -->
      </div>
      <div class="text-left">
        <label>Alasan membutuhkan bantuan</label>
        <label v-for="reason in reasons" :key="reason" class="block mr-2">
          <input
            type="radio"
            :key="reason"
            :id="reason"
            :value="reason"
            v-model="formData.reason"
            required
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            @change="handleReasonChange(reason)"
          />
          {{ reason }}</label
        >
        <!-- <p>Selected Reason: {{ formData.reason }}</p> -->
      </div>
      <textarea
        v-model="formData.message"
        class="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none text-black"
        name="message"
        placeholder="Your message"
        required
        :maxlength="5000"
      />

      <div class="gap-2 mr-2">
        <input
          required
          :rules="rules.required"
          type="checkbox"
          :id="label"
          v-model="formData.isChecked"
          class="text-left"
        />
        <!-- @click="handleisChecked" -->
        <label class="ml-2" :for="label">{{ label }}</label>
      </div>
      <button
        class="group flex items-center justify-center bg-white p-5 rounded-lg bg-opacity-10 hover:bg-opacity-20 transition-all"
      >
        Send
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
import Alert from '../components/Alert.vue'

interface Location {
  id: number
  name: string
}

interface State {
  provinces: Location[]
  regencies: Location[]
  districts: Location[]
  villages: Location[]
}

const store = useStore()
const provinces = ref<Location[]>([])
const regencies = ref<Location[]>([])
const districts = ref<Location[]>([])
const villages = ref<Location[]>([])
const selectedProvince = ref<number | string>('')
const selectedRegency = ref<number | string>('')
const selectedDistrict = ref<number | string>('')
const selectedVillage = ref<number | string>('')
const label = ref<string>(
  'Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggung jawabkan apabila ditemukan ketidaksesuaian dalam data tersebut'
)
const contactSection = ref(null)
const showAlert = ref(false)
const reasons = reactive([
  'Kehilangan pekerjaan',
  'Kepala keluarga terdampak atau korban Covid-19',
  'Tergolong fakir/miskin semenjak sebelum Covid-19'
] as string[])
const formData = reactive({
  senderEmail: '',
  message: '',
  nikFile: [] as any,
  kkFile: [] as any,
  province: '',
  regency: '',
  district: '',
  village: '',
  beforePandemic: 0,
  afterPandemic: 0,
  noNIK: '',
  noKK: '',
  reason: '',
  isChecked: false
})

const rules = reactive({
  required: (value: string) => {
    return !!value || 'This field is required.'
  },
  email: (value: string) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Invalid e-mail.'
  },
  isNikValid: (value: string) => {
    const pattern = /^[0-9]{16}$/
    return pattern.test(value) || 'Invalid NIK.'
  },
  isKkValid: (value: string) => {
    const pattern = /^[0-9]{16}$/
    return pattern.test(value) || 'Invalid KK.'
  }
})

const handleReasonChange = (selectedReason: any) => {
  formData.reason = selectedReason
  console.log('Selected Reason:', formData.reason)
}
// const handleisChecked = () => {
//   formData.isChecked = !formData.isChecked
//   console.log('Selected :', formData.isChecked)
// }

const handleNikFile = (event: any) => {
  const fileInput = event.target.files

  if (fileInput.length > 0) {
    // Assuming you want to update formData.nik with an array of selected files
    formData.nikFile = Array.from(fileInput).map((file: any) => ({
      name: file.name,
      preview: URL.createObjectURL(file)
    }))
  } else {
    // If no files are selected, you might want to reset the formData.nik
    formData.nikFile = []
  }
}
const handleKKFile = (event: any) => {
  const fileInput = event.target.files

  if (fileInput.length > 0) {
    // Assuming you want to update formData.nik with an array of selected files
    formData.kkFile = Array.from(fileInput).map((file) => ({
      name: file.name,
      preview: URL.createObjectURL(file)
    }))
  } else {
    // If no files are selected, you might want to reset the formData.nik
    formData.kkFile = []
  }
}

onMounted(async () => {
  fetchProvinces()
})

const formattedAfterPandemic = computed({
  // getter
  get() {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(formData.afterPandemic)
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    formData.afterPandemic = parseFloat(newValue.replace(/[^\d]/g, '')) || 0
  }
})
const formattedBeforePandemic = computed({
  // getter
  get() {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(formData.beforePandemic)
  },
  // setter
  set(newValue) {
    // Menghapus karakter non-digit dari nilai input
    const numericValue = parseFloat(newValue.replace(/[^\d]/g, '')) || 0

    formData.beforePandemic = numericValue
  }
})

const fetchProvinces = async () => {
  await store.dispatch('fetchProvinces')
  provinces.value = store.getters.getProvinces
}

const selectedProvinceName = computed(() => {
  const provinceId = selectedProvince.value
  const selected = provinces.value.find((province: any) => province.id === provinceId)
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
  const selected = regencies.value.find((regencies: any) => regencies.id === regenciesId)
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

const selectedVillageName = computed(() => {
  const villageId = selectedVillage.value
  const selected = villages.value.find((village) => village.id === villageId)
  return selected ? selected.name : ''
})

watch(
  () => selectedVillageName.value,
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
</script>

<style>
/* Style untuk membatasi panjang teks dan menambahkan titik tiga (...) */
.limited-text {
  display: inline-block;
  max-width: 100px; /* Sesuaikan nilai ini sesuai kebutuhan */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
