import Champion from "./champion.class";

export default class Knight extends Champion {
  getDamage(strenght: number) {
    if (!this.isProtected && (this.health - strenght) > 0) {
      this.health -= strenght;
    } else if (this.isProtected) {
      console.log('Knight was protected');
    } else {
      this.health = 0;
    }

    this.isProtected = false;
  }
}