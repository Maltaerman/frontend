import changelogs from '@/http_client/changelogs.js'
import guest from '@/http_client/guest.js'
import instance from '@/http_client/instance.js'
import locations from '@/http_client/locations.js'
import organizations from '@/http_client/organizations.js'
import user from '@/http_client/user.js'

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
  changelogs: changelogs(instance),
}

export default api
