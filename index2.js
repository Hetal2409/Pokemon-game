import chalk from "chalk";
import readlineSync from "readline-sync";
console.clear();
class Pokemon {
    name;
    health;
    magic;
    skills;
    counter;
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
        console.log(chalk.cyanBright(`${this.name}: Health - ${chalk.bgCyan(this.health)}, Magic - ${chalk.bgCyan(this.magic)}`));
        if (this.counter > 3) {
            console.log(chalk.cyanBright(`${this.name} has won the battle!`));
        }
    }
    getMagics() {
        const magicIncrease = Math.floor(Math.random() * 20);
        this.magic += magicIncrease;
        console.log(chalk.blueBright(`${this.name} gained ${chalk.green(magicIncrease)} magic points`));
    }
    hasEnoughMagic(skill) {
        if (skill.magic < this.magic) {
            console.log(chalk.bgYellow(`\nmagic: ${chalk.bgWhiteBright(this.magic)} --> ${this.name} attacking!`));
            return true;
        }
        else {
            console.log(chalk.bgYellow(`magic: ${chalk.bgWhiteBright(this.magic)} --> ${this.name} does not have enough magic to attack!!! Try other attackSkills or getMagic!`));
            return false;
        }
    }
    isAlive() {
        return this.health > 0;
    }
    attack(skill, opponent) {
        if (this.hasEnoughMagic(skill)) {
            opponent.health -= skill.damage;
            this.magic -= skill.magic;
            console.log(chalk.bgRedBright(`${this.name} attacked ${opponent.name} with ${chalk.bgGreenBright(skill.attack)} now ${this.name} has ${chalk.bgGreenBright(this.magic)} Magic left & ${opponent.name} has ${chalk.bgGreenBright(opponent.health)} Health left.`));
        }
        else {
            this.getMagics();
            console.log(chalk.bgRedBright(`${this.name} couldn't attack so now they are getting more magic`));
        }
    }
}
let pikachu = new Pokemon("pikachu", 120, 80);
let bulbasaur = new Pokemon("bulbasaur", 95, 120);
class AttackSkill {
    attack;
    damage;
    magic;
    constructor(attack, damage, magic) {
        this.attack = attack;
        this.damage = damage;
        this.magic = magic;
    }
}
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
        console.log(chalk.greenBright.underline("\nCurrent status:"));
        pikachu.showStatus();
        bulbasaur.showStatus();
        console.log(`A : ${chalk.underline(lightning.attack)}`, `\nB : ${chalk.underline(bombing.attack)}`, `\nC : ${chalk.underline("To abort the game")}`);
        const choice = readlineSync
            .keyIn(chalk.red(`\n${attcker.name} which attckSkill do u wanna attck with to ${defender.name}:- A or B : `), { limit: ["A", "B", "C"] })
            .toUpperCase();
        if (choice === "C") {
            console.log(chalk.bgBlueBright.bold("\nGame aborted"));
            return;
        }
        const selectedAttack = choice === "A" ? lightning : bombing;
        attcker.attack(selectedAttack, defender);
        turns++;
    } while (pikachu.isAlive() && bulbasaur.isAlive());
    if (pikachu.isAlive()) {
        console.log(chalk.bgGreen.bold(`${pikachu.name} has won the battle!`));
    }
    else {
        console.log(chalk.bgGreen.bold(`${bulbasaur.name} has won the battle!`));
    }
}
runGame();
console.log(chalk.bgRedBright.bold("\nGame over\n"));
