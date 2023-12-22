import './bootstrap';
import '../css/app.css';
import { createApp } from 'vue'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { FaRegularBell, BiTrash, BiPencil, MdAddalertOutlined } from "oh-vue-icons/icons"


//import component App
import App from './App.vue';

//import config router
import router from './routes'

addIcons(FaRegularBell, BiTrash, BiPencil, MdAddalertOutlined)

//create App Vue
const app = createApp(App);

//gunakan "router" di Vue dengan plugin "use"
app.use(router);

app.mount('#app');

app.component("v-icon", OhVueIcon);

const options = {};

app.use(Toast, options);