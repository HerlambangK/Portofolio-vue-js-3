import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
/* import specific icons */
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import "@/assets/main.css";

const app = createApp(App);

/* import the fontawesome core */

/* add icons to the library */
library.add(faMagnifyingGlass, faGithub);

app.use(router);
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
