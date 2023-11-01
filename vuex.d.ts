// vuex.d.ts
import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  Module,
} from "vuex";

// Definisi tipe state Anda
interface RootState {
  // Definisi state Anda di sini
}

// Definisi tipe dari modul Vuex jika Anda menggunakannya
interface ExampleModuleState {
  // Definisi state modul di sini
}

// Extend modul-root state dengan state modul jika Anda menggunakannya
interface RootStore extends Omit<VuexStore<RootState>, "getters"> {
  getters: {
    // Definisi getter Anda di sini
  };
  commit: {
    // Definisi commit Anda di sini
  };
  dispatch: {
    // Definisi dispatch Anda di sini
  };
}

// Export tipe Anda sesuai kebutuhan
export { RootState, ExampleModuleState };

export type Store = RootStore & {
  // Jika Anda memiliki modul, Anda dapat menambahkannya di sini
  // exampleModule: typeof exampleModule
};
