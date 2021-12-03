import Champion from "./champion.class";

export default class Knight extends Champion {
  type: string = 'Knight';

  getDamage<T extends Champion>(champion: T) {
    if (!this.isProtected && (this.health - champion.strength) > 0) {
      this.health -= champion.strength;
    } else if (this.isProtected) {
      console.log(`${this.name} was protected`);
    } else {
      this.health = 0;
    }

    this.isProtected = false;
  }
}