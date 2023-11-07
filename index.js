import chalk from "chalk";

class Pokemon {
  constructor(name, health, magic) {
    this.name = name;
    this.health = health;
    this.magic = magic;
    this.skills = [];
    this.counter = 0;
  }

  learnAttackSkill(newSkill) {
    this.skills.push(newSkill);
  }

  showStatus() {
    console.log(`${this.name}: Health - ${this.health}, Magic - ${this.magic}`);
    if (this.counter > 3) {
      console.log(`${this.name} has won the battle!`);
    }
  }

  getMagics() {
    const magicIncrease = Math.floor(Math.random() * 20);
    this.magic += magicIncrease;
    console.log(`${this.name} gained ${magicIncrease} magic points`);
  }

  hasEnoughMagic(skillName) {
    if (skillName.magic > Pokemon.magic) {
      console.log(`${this.name} not have enough magic! try other AttackSkill`);
    }
  }

  isAlive() {
    console.log(this.health > 0 ? true : false);
  }

  attack(skillName, opponent) {
    console.log(
      chalk.red(
        `${this.name} attacked ${opponent.name} with ${skillName.attack} now ${
          this.name
        } have ${this.magic - skillName.magic} magic left.`
      )
    );
  }
}

class AttackSkill {
  constructor(attack, damage, magic) {
    this.attack = attack;
    this.damage = damage;
    this.magic = magic;
  }
}

// create new Pokemons
let pikachu = new Pokemon("pikachu", 120, 80);
let bulbasaur = new Pokemon("bulbasaur", 95, 105);

// create new skills that Pokemons can learn
let lightning = new AttackSkill("lightning", 40, 30);
let bombing = new AttackSkill("poisonSeed", 20, 20);

pikachu.isAlive();
bulbasaur.attack(bombing, pikachu);
