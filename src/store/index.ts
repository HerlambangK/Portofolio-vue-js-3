// store.ts
// import { createStore } from "vuex";
import { createStore } from "vuex";
import axios from "axios";

interface Location {
  id: number;
  name: string;
}

interface State {
  provinces: Location[];
  regencies: Location[];
  districts: Location[];
  villages: Location[];
}

// const store: Store<State> = createStore({
// const store = createStore<State>({
export default createStore({
  state: {
    provinces: [],
    regencies: [],
    districts: [],
    villages: [],
  },

  mutations: {
    setProvinces(state: any, dataProvinces: Location[]) {
      state.provinces = dataProvinces;
    },
    setRegencies(state: any, regencies: Location[]) {
      state.regencies = regencies;
    },
    setDistricts(state: any, districts: Location[]) {
      state.districts = districts;
    },
    setVillages(state: any, villages: Location[]) {
      state.villages = villages;
    },
  },

  actions: {
    async fetchProvinces({ commit }: any) {
      const response = await axios.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );
      commit("setProvinces", response.data);
    },
    async fetchRegencies({ commit }: any, provinceId: number) {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
      );
      commit("setRegencies", response.data);
    },
    async fetchDistricts({ commit }: any, regencyId: number) {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json`
      );
      commit("setDistricts", response.data);
    },
    async fetchVillages({ commit }: any, districtId: number) {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json`
      );
      commit("setVillages", response.data);
    },
  },

  getters: {
    getProvinces(state: any) {
      return state.provinces;
    },
    getRegencies(state: any) {
      return state.regencies;
    },
    getDistricts(state: any) {
      return state.districts;
    },
    getVillages(state: any) {
      return state.villages;
    },
  },
});

// export default store;
