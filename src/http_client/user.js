
export default function (instance){
  return {
    LogIn(payload){
      return instance.post('/auth/login/token', payload,
        {headers : {'Content-Type': 'multipart/form-data'}});
    },
    GetInfo(){
        return instance.get('/users/me')
    },
    UpdateUserData(){

      return instance.put('/users/info', payload);
    },
    UpdateUserPass(payload){
      return instance.put('/users/password', payload)
    },
    changeRole({id , role }){ 
      return instance.put(`/users/change-role?user_id=${id}&role=${role}`)
    }, 
    RegistrationTokenConfirm(username, email, full_name, organization, password, access_token){
      return instance.post(`/users/confirm-registration/?access_token=${access_token}`,
        {
         username,
         email,
         full_name,
         organization,
         password
         })
    },
    VerifyRegistrationToken(access_token){
      return instance.get(`/users/verify`, {
        params: {access_token}
      })
    },
    PassResetRequest(user_email){
      return instance.put(`users/password-reset?user_email=${user_email}`)
    },
    PassResetConfirm(access_token, new_password){
      return instance.put("/users/confirm-reset", {
        access_token,
        new_password
      });
    },
    // organization is organization.id
    SendInvite({email,organization}){
      return instance.post("/users/invite", {email, organization})
    }
  }
}