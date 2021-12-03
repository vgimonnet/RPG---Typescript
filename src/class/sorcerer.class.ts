import Champion from "./champion.class";

export default class Sorcerer extends Champion {
  heal(): void {
    this.health += 10;
  }
}