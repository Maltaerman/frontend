// eslint-disable-next-line import/no-unresolved
import messages from '@intlify/unplugin-vue-i18n/messages'
import { createI18n } from 'vue-i18n'

import { store } from '../../store/mainStore'

export default createI18n({
  // locale: 'ua',
  locale: store.getters.getLocalization,
  legacy: false,
  globalInjection: true,
  fallbackLocale: 'ua',
  messages,
})
