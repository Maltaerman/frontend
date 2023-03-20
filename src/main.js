import './index.css'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import VueDatePicker from '@vuepic/vue-datepicker'
import ResizeTextarea from 'resize-textarea-vue3'
import { createApp } from 'vue'
import SimpleTypehead from 'vue3-simple-typeahead'

import App from './App.vue'
import { store } from './store/mainStore.js'
//import { Router } from "./router/mainRouter.js";
import { Router } from './router/dynamicRouter.js'
import i18n from './libs/i18n/index.js'
import ComponentsList from './components/ComponentsList.js'


import Info from '/src/components/pluginComponents/toast'

import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)

//TODO адреса та номер телефону найближчого відділку поліції
// адреса лікарні та заправки
// найближчі мережеві продуктові магазини
// пропозиції моєї мами

app.use(store)
app.use(Router)
app.use(i18n)
app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_GMAPS_APIKEY,
    language: store.getters.getLocalization,
    libraries: 'places',
  },
})
app.use(ResizeTextarea)
app.use(Info)
app.use(SimpleTypehead)

ComponentsList.forEach((component) => {
  app.component(component.name, component)
})
app.component('VueDatePicker', VueDatePicker)
/*
if(window.Cypress){
  window.app = app;
}*/

app.mount('#app')
