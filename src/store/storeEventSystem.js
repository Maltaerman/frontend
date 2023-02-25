//TODO event system store
class StoreEventSystemPrototype{
  events = {
    onUserOrganizationUpdate : "onUserOrganizationUpdate",
    onUserDataUpdate : "onUserDataUpdate",
    onUserPasswordUpdate : "onUserPassUpdate",
    onOrganizationChangeLogUpdate : "onOrganizationChangeLogUpdate"
  }

  onUserOrganizationUpdate = []

  subscribe(event, method){
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

const StoreEvents = new StoreEventSystemPrototype();
export default StoreEvents;