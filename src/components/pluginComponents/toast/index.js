import { h, render } from 'vue'

import ToasterModal from './ToasterModal.vue'
import eventSystem from './event-system.js'
import messageTypes from './messageTypes.js'

const mount = (comp, { props, children, element, app } = {}) => {
  let el = element ? element : document.createElement('div')
  let vNode = h(comp, props)
  if (app && app._context) {
    vNode.appContext = app._context
  }
  document.body.append(el)
  render(vNode, el, children)
  const destroy = () => {
    if (el) {
      render(null, el)
    }
    el = null
    vNode = null
  }
  return { vNode, destroy, el }
}

const Api = (globalOptions) => {
  return {
    show(message = '', options = { type: messageTypes.info }) {
      let op = {
        props: {
          message,
          ...options,
          ...globalOptions,
        },
      }
      let res = mount(ToasterModal, op)
      return res
    },
    info(message, options) {
      options.type = messageTypes.info
      this.show(message, options)
    },
    error(message, options = {}) {
      options.type = messageTypes.error
      this.show(message, options)
    },
    success(message, options = {}) {
      options.type = messageTypes.success
      this.show(message, options)
    },
    warning(message, options = {}) {
      options.type = messageTypes.warning
      this.show(message, options)
    },
    wait(message = '', onClose = () => {}) {
      let localOptions = {
        isCloseOnBg: false,
        duration: false,
        type: messageTypes.wait,
        onClose: onClose,
      }
      this.show(message, localOptions)
    },
    clear(data = {}) {
      eventSystem.$emit('toast-close', data)
    },
    // duration : Number ms || false, isCloseOnBg : Boolean, onClose : Function
    options(duration, isCloseOnBg = true, onClose = () => {}) {
      return {
        duration,
        isCloseOnBg,
        onClose,
      }
    },
  }
}

export default {
  install: (app, option = {}) => {
    app.component(ToasterModal, ToasterModal.name)
    let api = Api(option)
    // Default: isBgClickClose : True, duration : 3000ms
    app.config.globalProperties.$toast = api
  },
}
