import './bootstrap';
import '../css/app.css';
import { createApp } from 'vue'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { 
    FaRegularBell, 
    BiTrash, 
    BiArrowLeft, 
    BiPencil, 
    MdAddalertOutlined,
    BiCalendar,
    WiRefreshAlt,
    IoAlertCircleOutline
} from "oh-vue-icons/icons"
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


//import component App
import App from './App.vue';

//import config router
import router from './routes'

addIcons(
    FaRegularBell, 
    BiTrash, 
    BiPencil, 
    MdAddalertOutlined,
    BiArrowLeft,
    BiCalendar,
    WiRefreshAlt,
    IoAlertCircleOutline
)

//create App Vue
const app = createApp(App);

app.component("v-icon", OhVueIcon)
app.component('VueDatePicker', VueDatePicker);
app.use(router)
app.use(Toast, {})
app.use(VueSweetalert2)

app.mount('#app')

