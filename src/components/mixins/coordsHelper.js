export default {
  methods: {
    coordsFormatter(coords) {
      const res = {}
      if (typeof coords.lat === 'function') res.lat = coords.lat()
      else if (typeof coords.lat === 'number') res.lat = coords.lat
      else if (typeof coords.lat === 'string') res.lat = Number(coords.lat)

      if (typeof coords.lng === 'function') res.lng = coords.lng()
      else if (typeof coords.lng === 'number') res.lng = coords.lng
      else if (typeof coords.lng === 'string') res.lng = Number(coords.lng)
      return res
    },
  },
}
