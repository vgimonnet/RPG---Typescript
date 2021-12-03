import Archer from "./archer.class";

export default abstract class Champion {
  strength: number;
  health: number;
  name: string;
  isProtected: boolean;


  constructor(name: string, strength: number, health: number) {
    this.name = name;
    this.strength = strength;
    this.health = health;
    this.isProtected = false;
  }

  attack<T extends Champion>(champion: T): void {
    if (champion.health > 0) {
      champion.getDamage(this.strength);
    } else {
      console.log('Champion is already dead');
    }
  }

  protect(): void {
    this.isProtected = true;
  }

  getDamage(strength: number): void {
    if (this.isProtected && (this.health - strength/2) >= 0) {
      this.health -= strength/2;
    } else if (!this.isProtected && (this.health - strength) >= 0) {
      this.health -= strength;
    } else {
      this.health = 0;
    }

    this.isProtected = false;
  }
}