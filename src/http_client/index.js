import guest from './guest.js'
import instance from './instance.js'
import locations from './locations.js'
import organizations from './organizations.js'
import user from './user.js'

/*export default {
    locations: locations(instance),
    user: user(instance),
    organizations : organizations(instance),
    guest : guest(instance)
}*/

const api = {
  locations: locations(instance),
  user: user(instance),
  organizations: organizations(instance),
  guest: guest(instance),
}

export default api
