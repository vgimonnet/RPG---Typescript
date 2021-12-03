import Champion from "./champion.class";

export default class Knight extends Champion {
  getDamage<T extends Champion>(champion: T) {
    if (!this.isProtected && (this.health - champion.strength) > 0) {
      this.health -= champion.strength;
    } else if (this.isProtected) {
      console.log('Knight was protected');
    } else {
      this.health = 0;
    }

    this.isProtected = false;
  }
}