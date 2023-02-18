export default function (instance){
  return {
    getOrganizationsById(id){
      return instance.get(`/organizations/${id}`);
    },
    getOrganizationByName(query, options){
      return instance.get('/organizations/search', {
        params : {
          query
        },
        options
      });
    },
    getOrganizationList(page, limit){
      return instance.get("/organizations/all", {
          params : {
            page,
            limit
          }
        });
    },
    createOrganization(name, website){
      return instance.post('/organizations/create', {
          name,
          website
      })
    },

    //data : {
    //    name : String
    //    website : String
    //    description : String
    //    address : String
    //    city: "string",
    //    country: "string"
    // }
    editOrganization(id, data){
      return instance.put(`/organizations/${id}/edit`, data)
    },
    sendUserInvite(organization_id, emails){
      return instance.put(`/organizations/${organization_id}/invite`,
        {emails : emails}
      )
    },

    removeOrganization(id){
      return instance.delete(`/organizations/${id}`);
    },
    removeOrganizationMember(organization_id, user_id){
      return instance.put(`/organizations/${organization_id}/remove?user_id=${user_id}`)
    },
    // orgData : {
    //  name : string,
    //  website : string,
    //  address : string,
    //  emails : [string]
    //}
    inviteOrganization(orgData){
      return instance.post("/organizations/add", orgData);
    }
  }
}