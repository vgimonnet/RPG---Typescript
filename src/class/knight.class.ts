import Champion from "./champion.class";

export default class Knight extends Champion {
  getDamage(strenght: number) {
    if (!this.isProtected) {
      this.health -= strenght;
    } else {
      console.log('Knight was protected');
    }

    this.isProtected = false;
  }
}