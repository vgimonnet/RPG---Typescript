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

  attack(champion: Champion, nbAttack: number = 1): void {
    if (champion.health <= 0) {
      if (champion instanceof Archer && nbAttack > 1) {
        for (let i: number = 0; i < nbAttack; i++) {
          champion.getDamage(this.strength);      
        }
      } else {
        champion.getDamage(this.strength);
      }    
    } else {
      console.log('Champion is already dead');
    }
  }

  protect(): void {
    this.isProtected = true;
  }

  getDamage(strength: number): void {
    if (this.isProtected && (this.health -strength/2) >= 0) {
      this.health -= strength/2;
    } else if (!this.isProtected && (this.health -strength) >= 0) {
      this.health -= strength;
    } else {
      this.health = 0;
    }

    this.isProtected = false;
  }
}