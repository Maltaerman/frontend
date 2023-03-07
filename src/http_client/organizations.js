export default function (instance) {
  return {
    getOrganizationsById(id) {
      return instance.get(`/organizations/${id}`);
    },
    getOrganizationByName(query, options) {
      return instance.get("/organizations/search", {
        params: {
          query,
        },
        options,
      });
    },
    getOrganizationList(page, limit) {
      return instance.get("/organizations/all", {
        params: {
          page,
          limit,
        },
      });
    },
    createOrganization(name, website) {
      return instance.post("/organizations/create", {
        name,
        website,
      });
    },
    editOrganization(id, name, website, description) {
      return instance.put(`/organizations/${id}/edit`, {
        name,
        website,
        description,
      });
    },
    getOrgById(id) {
      return instance.get(`/organizations/${id}`);
    },
    sendUserInvite(organization_id, emails) {
      return instance.put(`/organizations/${organization_id}/invite`, {
        emails: emails,
      });
    },
    removeOrganization(id) {
      return instance.delete(`/organizations/${id}`);
    },
    removeOrganizationMember(organization_id, user_id) {
      return instance.put(
        `/organizations/${organization_id}/remove?user_id=${user_id}`
      );
    },
  };
}
