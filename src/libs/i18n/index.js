import { store } from '../../store/mainStore.js'
import messages from '@intlify/unplugin-vue-i18n/messages'
import { createI18n } from 'vue-i18n'

export default createI18n({
  //locale: 'ua',
  locale: store.getters.getLocalization,
  legacy: false,
  globalInjection: true,
  fallbackLocale: 'ua',
  messages,
})
