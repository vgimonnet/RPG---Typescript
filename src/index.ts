import Archer from './class/archer.class';
import Knight from './class/knight.class';
import Sorcerer from './class/sorcerer.class';

let archer: Archer = new Archer('Legolas', 110, 100);
let knight: Knight = new Knight('Aragorn', 10, 100);
let sorcerer: Sorcerer = new Sorcerer('Gandalf', 10, 100);

knight.protect();
archer.doubleAttack(knight);
sorcerer.heal();
console.log('Archer health:', archer.health);
console.log('Knight health:', knight.health);
console.log('Sorcerer health:', sorcerer.health);


