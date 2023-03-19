class Event {
  constructor() {
    this.queue = {};
  }

  $on(name, callback) {
    this.queue[name] = this.queue[name] || [];
    this.queue[name].push(callback);
  }

  $off(name, callback) {
    if (this.queue[name]) {
      /*for (let i = 0; i < this.queue[name].length; i++) {
        if (this.queue[name][i] === callback) {
          this.queue[name].splice(i, 1)
          break
        }
      }*/
      this.queue[name] = this.queue[name].filter((e) => e !== callback);
    }
  }

  $emit(name, data) {
    if (this.queue[name]) {
      this.queue[name].forEach(function (callback) {
        callback(data);
      });
    }
  }
}

const event = new Event();

export default event;
