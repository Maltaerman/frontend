/* eslint-disable import/no-cycle */
import changelogs from './changelogs'
import guest from './guest'
import instance from './instance'
import locations from './locations'
import organizations from './organizations'
import user from './user'

/* export default {
    locations: locations(instance),
    user: user(instance),
    organizations : organizations(instance),
    guest : guest(instance)
} */

const api = {
  locations: locations(instance),
  user: user(instance),
  organizations: organizations(instance),
  guest: guest(instance),
  changelogs: changelogs(instance),
}

export default api
