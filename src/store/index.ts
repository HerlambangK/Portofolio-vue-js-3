// store.ts
// import { createStore } from "vuex";
import { createStore } from 'vuex'
import axios from 'axios'
import { locationStoreEnum } from '../../types/enums/store/locationStoreEnum'

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

// const store: Store<State> = createStore({
// const store = createStore<State>({
export default createStore<State>({
  state: {
    provinces: [],
    regencies: [],
    districts: [],
    villages: []
  },

  mutations: {
    [locationStoreEnum.Mutations.SET_PROVINCES](state: any, dataProvinces: Location[]) {
      state.provinces = dataProvinces
    },
    [locationStoreEnum.Mutations.SET_REGENCIES](state: any, regencies: Location[]) {
      state.regencies = regencies
    },
    [locationStoreEnum.Mutations.SET_DISTRICTS](state: any, districts: Location[]) {
      state.districts = districts
    },
    [locationStoreEnum.Mutations.SET_VILLAGES](state: any, villages: Location[]) {
      state.villages = villages
    }
  },

  actions: {
    async [locationStoreEnum.Actions.FETCH_PROVINCES]({ commit }: any) {
      const response = await axios.get(
        'https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json'
      )
      commit(locationStoreEnum.Mutations.SET_PROVINCES, response.data)
    },
    async [locationStoreEnum.Actions.FETCH_REGENCIES]({ commit }: any, provinceId: number) {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
      )
      commit(locationStoreEnum.Mutations.SET_REGENCIES, response.data)
    },
    async [locationStoreEnum.Actions.FETCH_DISTRICTS]({ commit }: any, regencyId: number) {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`
      )
      commit(locationStoreEnum.Mutations.SET_DISTRICTS, response.data)
    },
    async [locationStoreEnum.Actions.FETCH_VILLAGES]({ commit }: any, districtId: number) {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`
      )
      commit(locationStoreEnum.Mutations.SET_VILLAGES, response.data)
    }
  },

  getters: {
    [locationStoreEnum.Getters.GET_PROVINCES](state: any) {
      return state.provinces
    },
    [locationStoreEnum.Getters.GET_REGENCIES](state: any) {
      return state.regencies
    },
    [locationStoreEnum.Getters.GET_DISTRICTS](state: any) {
      return state.districts
    },
    [locationStoreEnum.Getters.GET_VILLAGES](state: any) {
      return state.villages
    }
  }
})
