import IChampion from './champion.interface';

export default abstract class Champion implements IChampion {
  strength: number;
  health: number;
  maxHealth: number;
  name: string;
  isProtected: boolean;
  type: string = 'Champion';

  constructor(name: string, strength: number, health: number) {
    this.name = name;
    this.strength = Math.abs(strength);
    this.health = this.maxHealth = Math.abs(health);
    this.isProtected = false;
  }

  attack<T extends Champion>(champion: T): void {
    if (this.health > 0) {
      if (JSON.stringify(champion) !== JSON.stringify(this)) {
        this.isProtected = false;
        if (champion.health > 0 && this.strength >= 0) {
          champion.getDamage(this);
        } else if (this.strength < 0) {
          console.log('There is a problem with your Champion ! His strength cannot be negative !');
        } else {
          console.log('Champion is already dead');
        }
      } else {
        console.log('Champion could not attacks himself');
      }
    } else {
      console.log('You\'re deade ! You cannot attack !');
    }
  }

  protect(): void {
    this.isProtected = true;
  }

  getDamage<T extends Champion>(champion: T): void {
    if (this.isProtected && (this.health - champion.strength/2) >= 0) {
      this.health -= champion.strength/2;
    } else if (!this.isProtected && (this.health - champion.strength) >= 0) {
      this.health -= champion.strength;
    } else {
      this.health = 0;
    }

    this.isProtected = false;
  }
}
