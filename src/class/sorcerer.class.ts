import Champion from "./champion.class";

export default class Sorcerer extends Champion {
  heal(): void {
    if (this.health + 10 < this.maxHealth) {
      this.health += 10;
    } else {
      this.health = this.maxHealth;
    }
  }
}