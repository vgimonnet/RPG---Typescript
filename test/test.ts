import Archer from "../src/class/archer.class";
import Sorcerer from "../src/class/sorcerer.class";
import Knight from "../src/class/knight.class";
import Dwarf from "../src/class/dwarf.class";

describe('Knigth', () => {
  let knight: Knight;
  let sorcerer: Sorcerer;

  beforeEach(() => {
    knight = new Knight('Aragorn', 10, 100);
    sorcerer = new Sorcerer('Gandalf', 10, 100);
  });

  test('Attack', () => {
    knight.attack(sorcerer);
    expect(sorcerer.health).toBe(90);
  });

  test('Attack negative', () => {
    knight = new Knight('Aragorn', -10, 100);
    knight.attack(sorcerer);
    expect(sorcerer.health).toBe(90);
  });

  test('Attack himself', () => {
    knight.attack(knight);
    expect(knight.health).toBe(100);
  });

  test('Attack protect himself', () => {
    knight.protect();
    knight.attack(knight);
    expect(knight.isProtected).toBe(true);
  });

  test('Get damage', () => {
    sorcerer.attack(knight);
    expect(knight.health).toBe(90);
  });

  test('Protect', () => {
    knight.protect();
    expect(knight.isProtected).toBe(true);
  });

  test('Protection fall', () => {
    knight.protect();
    knight.attack(sorcerer);
    expect(knight.isProtected).toBe(false);
  });

  test('Protected damage', () => {
    knight.protect();
    sorcerer.attack(knight);
    expect(knight.health).toBe(100);
  });

  test('Attack a Dead', () => {
    knight = new Knight('Aragorn', 10, 100);
    sorcerer = new Sorcerer('Gandalf', 10, 10);

    knight.attack(sorcerer);
    knight.attack(sorcerer);
    expect(sorcerer.health).toBe(0);
  });

  test('Attack Low HP', () => {
    knight = new Knight('Aragorn', 10, 100);
    sorcerer = new Sorcerer('Gandalf', 10, 4);

    knight.attack(sorcerer);
    expect(sorcerer.health).toBe(0);
  });
});

describe('Sorcerer', () => {
  let knight: Knight;
  let sorcerer: Sorcerer;

  beforeEach(() => {
    knight = new Knight('Aragorn', 10, 100);
    sorcerer = new Sorcerer('Gandalf', 10, 100);
  });

  test('Attack', () => {
    sorcerer.attack(knight);
    expect(knight.health).toBe(90);
  });

  test('Attack negative', () => {
    sorcerer = new Sorcerer('Gandalf', -10, 100);
    sorcerer.attack(knight);
    expect(knight.health).toBe(90);
  });

  test('Attack himself', () => {
    sorcerer.attack(sorcerer);
    expect(sorcerer.health).toBe(100);
  });

  test('Attack protect himself', () => {
    sorcerer.protect();
    sorcerer.attack(sorcerer);
    expect(sorcerer.isProtected).toBe(true);
  });

  test('Get damage', () => {
    knight.attack(sorcerer);
    expect(sorcerer.health).toBe(90);
  });

  test('Protect', () => {
    sorcerer.protect();
    expect(sorcerer.isProtected).toBe(true);
  });

  test('Protection fall', () => {
    sorcerer.protect();
    sorcerer.attack(knight);
    expect(sorcerer.isProtected).toBe(false);
  });

  test('Protected damage', () => {
    sorcerer.protect();
    knight.attack(sorcerer);
    expect(sorcerer.health).toBe(95);
  });

  test('Heal', () => {
    knight.attack(sorcerer);
    knight.attack(sorcerer);
    sorcerer.heal();
    expect(sorcerer.health).toBe(90);
  });

  test('Can\'t heal while dead', () => {
    sorcerer = new Sorcerer('Gandalf', 10, 14);
    knight.attack(sorcerer);
    knight.attack(sorcerer);
    knight.attack(sorcerer);
    sorcerer.heal();
    expect(sorcerer.health).toBe(0);
  });

  test('Half healing', () => {
    sorcerer.protect();
    knight.attack(sorcerer);
    sorcerer.heal();
    expect(sorcerer.health).toBe(100);
  });

  test('Can\'t heal at max HP', () => {
    sorcerer.heal();
    expect(sorcerer.health).toBe(100);
  });

  test('Attack a Dead', () => {
    sorcerer = new Sorcerer('Gandalf', 10, 100);
    knight = new Knight('Aragorn', 10, 10);

    sorcerer.attack(knight);
    sorcerer.attack(knight);
    expect(knight.health).toBe(0);
  });

  test('Attack Low HP', () => {
    sorcerer = new Sorcerer('Gandalf', 10, 100);
    knight = new Knight('Aragorn', 10, 4);

    sorcerer.attack(knight);
    expect(knight.health).toBe(0);
  });
});

describe('Archer', () => {
  let knight: Knight;
  let sorcerer: Sorcerer;
  let archer: Archer;

  beforeEach(() => {
    knight = new Knight('Aragorn', 10, 100);
    sorcerer = new Sorcerer('Gandalf', 10, 100);
    archer = new Archer('Legolas', 10, 100);
  });

  test('Attack', () => {
    archer.attack(sorcerer);
    expect(sorcerer.health).toBe(90);
  });

  test('Attack negative', () => {
    archer = new Archer('Legolas', -10, 100);
    archer.attack(sorcerer);
    expect(sorcerer.health).toBe(90);
  });

  test('Attack himself', () => {
    archer.attack(archer);
    expect(archer.health).toBe(100);
  });

  test('Attack protect himself', () => {
    archer.protect();
    archer.attack(archer);
    expect(archer.isProtected).toBe(true);
  });

  test('Double attack', () => {
    archer.doubleAttack(sorcerer);
    expect(sorcerer.health).toBe(80);
  });

  test('Get damage', () => {
    sorcerer.attack(archer);
    expect(archer.health).toBe(90);
  });

  test('Protect', () => {
    archer.protect();
    expect(archer.isProtected).toBe(true);
  });

  test('Protection fall', () => {
    archer.protect();
    archer.attack(sorcerer);
    expect(archer.isProtected).toBe(false);
  });

  test('Protected damage', () => {
    archer.protect();
    sorcerer.attack(archer);
    expect(archer.health).toBe(95);
  });

  test('Attack a Dead', () => {
    sorcerer = new Sorcerer('Gandalf', 10, 10);

    archer.attack(sorcerer);
    archer.attack(sorcerer);
    expect(sorcerer.health).toBe(0);
  });

  test('Attack Low HP', () => {
    sorcerer = new Sorcerer('Gandalf', 10, 4);

    archer.attack(sorcerer);
    expect(sorcerer.health).toBe(0);
  });
});

describe('Dwarf', () => {
  let dwarf: Dwarf;
  let archer: Archer;

  beforeEach(() => {
    dwarf = new Dwarf('Gimli', 10, 100);
    archer = new Archer('Legolas', 10, 100);
  });

  test('Attack', () => {
    dwarf.attack(archer);
    expect(archer.health).toBe(90);
  });

  test('Attack negative', () => {
    dwarf = new Dwarf('Gimli', -10, 100);
    dwarf.attack(archer);
    expect(archer.health).toBe(90);
  });

  test('Attack himself', () => {
    dwarf.attack(dwarf);
    expect(dwarf.health).toBe(100);
  });

  test('Attack protect himself', () => {
    dwarf.protect();
    dwarf.attack(dwarf);
    expect(dwarf.isProtected).toBe(true);
  });

  test('Get damage', () => {
    archer.attack(dwarf);
    expect(dwarf.health).toBe(90);
  });

  test('Protect', () => {
    dwarf.protect();
    expect(dwarf.isProtected).toBe(true);
  });

  test('Protection fall', () => {
    dwarf.protect();
    dwarf.attack(archer);
    expect(dwarf.isProtected).toBe(false);
  });

  test('Protected damage', () => {
    dwarf.protect();
    archer.attack(dwarf);
    expect(dwarf.health).toBe(100);
  });

  test('Protected damage opponent', () => {
    dwarf.protect();
    archer.attack(dwarf);
    expect(archer.health).toBe(90);
  });

  test('Attack a Dead', () => {
    archer = new Archer('Legolas', 10, 10);

    dwarf.attack(archer);
    dwarf.attack(archer);
    expect(archer.health).toBe(0);
  });

  test('Attack Low HP', () => {
    archer = new Archer('Legolas', 10, 4);

    dwarf.attack(archer);
    expect(archer.health).toBe(0);
  });

  test('Damage Low HP', () => {
    dwarf = new Dwarf('Gimli', 10, 4);

    archer.attack(dwarf);
    expect(dwarf.health).toBe(0);
  });
});
