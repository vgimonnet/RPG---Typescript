import Champion from "./champion.class";

export default class Archer extends Champion {
  type: string = 'Archer';
  
  doubleAttack<T extends Champion>(champion: T) {
    this.attack(champion);
    this.attack(champion);
  }
}