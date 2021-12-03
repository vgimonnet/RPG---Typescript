import Archer from "../src/class/archer.class";
import Sorcerer from "../src/class/sorcerer.class";
import Knight from "../src/class/knight.class";

describe('Knigth', () => {
  let knight: Knight;
  let sorcerer: Sorcerer;
  let archer: Archer;

  beforeEach(() => {
    knight = new Knight('Aragorn', 10, 100);
    sorcerer = new Sorcerer('Gandalf', 10, 100);
    archer = new Archer('Legolas', 10, 100);
  });

  test('Attack', () => {
    knight.attack(sorcerer);
    expect(sorcerer.health).toBe(90);
  });

  test('Get damage', () => {
    sorcerer.attack(knight);
    expect(knight.health).toBe(90);
  });

  test('Protect', () => {
    knight.protect();
    expect(knight.isProtected).toBe(true);
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
});

describe('Sorcerer', () => {
  let knight: Knight;
  let sorcerer: Sorcerer;
  let archer: Archer;

  beforeEach(() => {
    knight = new Knight('Aragorn', 10, 100);
    sorcerer = new Sorcerer('Gandalf', 10, 100);
    archer = new Archer('Legolas', 10, 100);
  });

  test('Attack', () => {
    sorcerer.attack(knight);
    expect(knight.health).toBe(90);
  });

  test('Get damage', () => {
    knight.attack(sorcerer);
    expect(sorcerer.health).toBe(90);
  });

  test('Protect', () => {
    sorcerer.protect();
    expect(sorcerer.isProtected).toBe(true);
  });

  test('Protected damage', () => {
    sorcerer.protect();
    knight.attack(sorcerer);
    expect(sorcerer.health).toBe(95);
  });

  test('Heal', () => {
    knight.attack(sorcerer);
    sorcerer.heal();
    expect(sorcerer.health).toBe(100);
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

  test('Protected damage', () => {
    archer.protect();
    sorcerer.attack(archer);
    expect(archer.health).toBe(95);
  });

  test('Attack a Dead', () => {
    archer = new Archer('Legolas', 10, 100);
    knight = new Knight('Aragorn', 10, 10);

    archer.attack(knight);
    archer.attack(knight);
    expect(knight.health).toBe(0);
  });
});
