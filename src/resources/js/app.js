import './bootstrap';
import '../css/app.css';
import { createApp } from 'vue'


//import component App
import App from './App.vue';

//import config router
import router from './routes'

//create App Vue
const app = createApp(App);

//gunakan "router" di Vue dengan plugin "use"
app.use(router);

app.mount('#app');