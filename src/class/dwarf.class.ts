import Champion from "./champion.class";

export default class Dwarf extends Champion {
  getDamage<T extends Champion>(champion: T) {
    if (this.isProtected) {
      this.attack(champion);
    } else if (!this.isProtected && (this.health - champion.strength) >= 0) {
      this.health -= champion.strength;
    } else {
      this.health = 0;
    }

    this.isProtected = false;
  }
}