import './index.css'
import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store/mainStore.js'
//import { Router } from "./router/mainRouter.js";
import { Router } from './router/dynamicRouter.js'
import i18n from './libs/i18n/index.js'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import ComponentsList from './components/ComponentsList.js'
import ResizeTextarea from 'resize-textarea-vue3'
import Info from '/src/components/pluginComponents/toast'
import SimpleTypehead from 'vue3-simple-typeahead'

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

app.mount('#app')
