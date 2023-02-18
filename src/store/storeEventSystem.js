class StoreEventSystem{
  events = {
    onUserOrganizationUpdate : "onUserOrganizationUpdate"
  }

  onUserOrganizationUpdate = []

  subscribe(event, method){
    console.log(event, method)
    if(!this[event])
      this[event] = [];
    this[event].push(method);
  }

  unsubscribe(event, method){
    if(this[event]) {
      this[event] = this[event].filter(x=>x!=method);
    }
  }

  invoke(event, data){
    if(this[event]){
      this[event].forEach(func=>{
        func(data);
      })
    }
  }
}

const StoreEvents = new StoreEventSystem();
export default StoreEvents;