class Emitter {
  constructor() {
    this.listeners = [];
  }

  subscribe(callback) {
    this.listeners.push(callback);
    const length = this.listeners.length;

    return () => {
      return this.listeners.splice(length - 1, 1);
    };
  }

  emit(message) {
    this.listeners.forEach((listener) => {
      listener(message);
    });
  }
}

const emitter = new Emitter();

const unsubscribe = emitter.subscribe((mes) => {
  console.log(mes + "- morning");
});

emitter.subscribe((mes) => {
  console.log(mes + "- evening");
});

emitter.emit("good");
unsubscribe();

setTimeout(() => {
  emitter.emit("good");
}, 3000);
