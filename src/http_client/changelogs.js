export default function changelogs(instance) {
  return {
    getLocationChangeLog(locationId) {
      return instance.get(`changelogs/${locationId}`)
    },
    //payload : {
    //  organization_id : int,
    //  admin_id : int
    //  query : string (address)
    //  date_min : UNIX milliseconds
    //  date_max : UNIX milliseconds
    // }
    getOrganizationChangeLog(payload) {
      return instance.get('changelogs/search/', {
        params: payload,
      })
    },
    locationChangelogVisibilityToggle(id) {
      return instance.put(`changelogs/visibility/${id}`)
    },
  }
}
