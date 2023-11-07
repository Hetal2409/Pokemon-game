import chalk from "chalk";

class Pokemon {
  constructor(name, health, magic) {
    this.name = chalk.bold.italic(name);
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
    console.log(
      chalk.blueBright(
        `${this.name} gained ${chalk.green(magicIncrease)} magic points`
      )
    );
  }

  hasEnoughMagic(skillName) {
    if (skillName.magic < this.magic) {
      console.log(
        chalk.bgGray(
          `magic: ${chalk.bgWhiteBright(this.magic)} --> ${
            this.name
          } has enough magic, can attack!`
        )
      );
      return true;
    } else {
      console.log(
        chalk.bgYellow(
          `magic: ${chalk.bgWhiteBright(this.magic)} --> ${
            this.name
          } does not have enough magic to attack!!! Try other attackSkills or getMagic!`
        )
      );
      return false;
    }
  }

  isAlive() {
    return this.health > 0;
  }

  attack(skillName, opponent) {
    if (this.hasEnoughMagic(skillName)) {
      opponent.health -= skillName.damage;
      this.magic -= skillName.magic;

      console.log(
        chalk.bgRedBright(
          `${this.name} attacked ${opponent.name} with ${
            skillName.attack
          } now ${this.name} has ${chalk.bgGreenBright(this.magic)} magic left.`
        )
      );
    } else {
      this.getMagics();
      console.log(
        chalk.bgRedBright(
          `${this.name} couldn't attack so now they are getting more magic`
        )
      );
    }
  }
}
// create new Pokemons
let pikachu = new Pokemon("pikachu", 120, 80);
let bulbasaur = new Pokemon("bulbasaur", 95, 120);

class AttackSkill {
  constructor(attack, damage, magic) {
    this.attack = attack;
    this.damage = damage;
    this.magic = magic;
  }
}
// create new skills that Pokemons can learn
let lightning = new AttackSkill("lightning", 40, 30);
let bombing = new AttackSkill("poisonSeed", 20, 20);

pikachu.learnAttackSkill(lightning);
pikachu.learnAttackSkill(bombing);

bulbasaur.learnAttackSkill(bombing);
bulbasaur.learnAttackSkill(lightning);

function runGame() {
  let turns = 0;
  do {
    const attcker = turns % 2 === 0 ? pikachu : bulbasaur;
    const defender = turns % 2 === 0 ? bulbasaur : pikachu;

    let attackSkill;

    console.log("\nCurrent status:");
    pikachu.showStatus();
    bulbasaur.showStatus();

    attackSkill =
      attcker.skills[Math.floor(Math.random() * attcker.skills.length)];

    attcker.attack(attackSkill, defender);

    turns++;
  } while (pikachu.isAlive() && bulbasaur.isAlive());

  if (pikachu.isAlive()) {
    console.log(chalk.bgGreen.bold(`${pikachu.name} has won the battle!`));
  } else {
    console.log(chalk.bgGreen.bold(`${bulbasaur.name} has won the battle!`));
  }
}

runGame();

console.log(chalk.bgRedBright.bold("\nGame over\n"));
