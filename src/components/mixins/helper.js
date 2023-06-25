/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
/* eslint-disable camelcase */
export default {
  methods: {
    isEqual2(object1, object2) {
      if (!object1 || !object2) return false
      const obj1 = JSON.stringify(object1)
      const obj2 = JSON.stringify(object2)

      return obj1 === obj2
    },
    getLineCount(el) {
      const style = window.getComputedStyle(el, null)
      let height = parseInt(style.getPropertyValue('height'))
      const font_size = parseInt(style.getPropertyValue('font-size'))
      let line_height = parseInt(style.getPropertyValue('line-height'))
      const box_sizing = style.getPropertyValue('box-sizing')

      if (isNaN(line_height)) line_height = font_size * 1.2

      if (box_sizing === 'border-box') {
        const padding_top = parseInt(style.getPropertyValue('padding-top'))
        const padding_bottom = parseInt(style.getPropertyValue('padding-bottom'))
        const border_top = parseInt(style.getPropertyValue('border-top-width'))
        const border_bottom = parseInt(
          style.getPropertyValue('border-bottom-width'),
        )
        height = height - padding_top - padding_bottom - border_top - border_bottom
      }
      const lines = Math.ceil(height / line_height)
      return lines
    },
    GetRandomElement(array) {
      return array[this.getRndInteger(0, array.length - 1)]
    },
    getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
  },
}
