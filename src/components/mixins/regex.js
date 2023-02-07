export default {
  data(){
    return{
      //Email
      mailRegex : new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
      //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
      passRegex : new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/),
      //Name Validation
      nameRegex : new RegExp(/^[a-zA-ZА-Яа-я]{3,}$/),
      // Only digits
      onlyDigitsRegex : new RegExp(/^\d+$/)
    }
  },
  methods : {
    isMail(mail){
      //console.log(`Mail is ${this.mailRegex.test(mail)}`)
      return this.mailRegex.test(mail);
    },
    isPass(pass){
      //console.log(`Pass is ${this.passRegex.test(pass)}`)
      return this.passRegex.test(pass);
    },
    isName(name){
      //return this.nameRegex.test(name)
      console.log("name " + name)
      return name.length >= 3;
    }
  }
}
