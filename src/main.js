import { createApp } from 'vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import './index.css'
import 'vue3-carousel/dist/carousel.css';
import App from './App.vue'
import {API_KEY} from "./Scripts/MapScripts.js"
import {store}  from "./store/mainStore.js"
import {mainRouter} from "./router/mainRouter.js";
import {createRouter, createWebHistory} from "vue-router";
import ComponentsList from "./components/ComponentsList.js";
import ResizeTextarea from 'resize-textarea-vue3'

const app = createApp(App);
const router = createRouter(
  {
    routes : mainRouter,
    history : createWebHistory()
  }
);

app.use(VueGoogleMaps,{
        load: {
            key: API_KEY,
            language: 'ua',
            libraries: "places"
        },
    });


app.use(store);
app.use(router);

ComponentsList.forEach(component=>{
  app.component(component.name, component);
})
app.use(ResizeTextarea);
app.mount('#app');
