import instance from './instance.js'

import locations from './locations.js'
import user from './user.js'
import organizations from './organizations.js'
import guest from './guest.js'

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
