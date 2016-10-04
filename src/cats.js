class Cat {
  constructor(name) {
    this.name = name;
  }
  meow() {
    return `Meow meow, I am ${this.name}`;
  }
}

module.exports = Cat;
