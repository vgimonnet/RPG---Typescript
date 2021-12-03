import Champion from "./champion.class";

export default interface IChampion {
  attack<T extends Champion>(champion: T): void;
  protect(): void;
  getDamage(strenght: number): void;
}