class Alien {
  constructor(name) {
    this.name = name;
  }
  makeNoise() {
    return `${this.name} says, "Grrrrrrrrrrrrrr"`;
  }
}

module.exports = Alien;
