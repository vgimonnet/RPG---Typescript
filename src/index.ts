import Archer from './class/archer.class';
import Champion from './class/champion.class';
import Dwarf from './class/dwarf.class';
import Knight from './class/knight.class';
import Sorcerer from './class/sorcerer.class';

const championClasses: any = {
  'Archer': Archer,
  'Knight': Knight,
  'Sorcerer': Sorcerer,
  'Dwarf': Dwarf,
}

const championActions: any = {
  'Archer': [
    { title: 'Attack', value: 'attack'},
    { title: 'Protect', value: 'protect'},
    { title: 'DoubleAttack', value: 'doubleAttack'}
  ],
  'Dwarf': [
    { title: 'Attack', value: 'attack'},
    { title: 'Protect', value: 'protect'},
  ],
  'Knight': [
    { title: 'Attack', value: 'attack'},
    { title: 'Protect', value: 'protect'},
  ],
  'Sorcerer': [
    { title: 'Attack', value: 'attack'},
    { title: 'Protect', value: 'protect'},
    { title: 'Heal', value: 'heal'}
  ]
}

const prompts = require('prompts');
prompts.override(require('yargs').argv);

let champions: Champion[] = [];
let nbPlayers: number = 0;
let isEnded: boolean = false;

(async () => {
  // Get number of players
  do {
    const howManyPlayers: any = await prompts([
      {
        type: 'text',
        name: 'howManyPlayers',
        message: `How many players are you ? (2 required)`
      }
    ]);
    if (Number.isInteger(parseInt(howManyPlayers.howManyPlayers))) {
      nbPlayers = parseInt(howManyPlayers.howManyPlayers);
    } else {
      nbPlayers = 0;
    }

  } while (nbPlayers <= 1);
  console.log(`You're ${nbPlayers} players !`);
  // Select champion foreach player
  for (let i: number = 0; i < nbPlayers; i++) {
    var whichChampion: any = await prompts([
      {
        type: 'select',
        name: 'champion',
        message: 'Which Champion did you want to play ?',
        choices: [
          { title: 'Archer', value: 'Archer' },
          { title: 'Dwarf', value: 'Dwarf' },
          { title: 'Knight', value: 'Knight' },
          { title: 'Sorcerer', value: 'Sorcerer' }
        ],
      },
      {
        type: 'text',
        name: 'username',
        message: 'What is your username ?'
      }
    ]);
    champions[i] = new championClasses[whichChampion.champion](whichChampion.username, 10, 100);      
  }

  console.log('Let the game begins !');
  // Le jeu commence
  do { 
    var deadChampions: number[] = [];
    for (let i: number = 0; i < champions.length; i++) {
      const myChampion: Champion = champions[i];
      if (myChampion.health <= 0) {
        deadChampions.push(i);
        console.log(`Sorry ${myChampion.name} you're dead !`);
      } else {
        var championAction: any = await prompts([
          {
            type: 'select',
            name: 'action',
            message: `${myChampion.name } - What action do you want to do?`,
            choices: championActions[myChampion.type]
          }
        ]);

        if (championAction.action === 'attack') {
          var championICanAttack: any = [];
          for (let j: number = 0; j < champions.length; j++) {
            if (j !== i) {
              championICanAttack.push({ title: champions[j].name, value: j })
            }        
          }
          
          var championIWantAttack: any = await prompts([
            {
              type: 'select',
              name: 'attack',
              message: `${myChampion.name } - Which player you want attack?`,
              choices: championICanAttack
            }
          ]);

          var championIAttack: Champion = champions[championIWantAttack.attack];

          myChampion.attack(championIAttack);
          console.log(`${myChampion.name} attacked ${championIAttack.name}`);
          console.log(`${championIAttack.name}'s life : ${championIAttack.health}`);
        } else if (championAction.action === 'protect') {
          myChampion.protect();
          console.log(`${myChampion.name} is ready to protect`);
        } else if (championAction.action === 'doubleAttack' && myChampion instanceof Archer) {
          var championICanAttack: any = [];
          for (let j: number = 0; j < champions.length; j++) {
            if (j !== i) {
              championICanAttack.push({ title: champions[j].name, value: j })
            }        
          }
          
          var championIWantAttack: any = await prompts([
            {
              type: 'select',
              name: 'attack',
              message: `${myChampion.name } - Which player you want attack?`,
              choices: championICanAttack
            }
          ]);

          var championIAttack: Champion = champions[championIWantAttack.attack];

          myChampion.doubleAttack(championIAttack);
          console.log(`${myChampion.name} double attacked ${championIAttack.name}`);
          console.log(`${championIAttack.name}'s life : ${championIAttack.health}`);
        } else if (championAction.action === 'heal') {
          if (myChampion instanceof Sorcerer) {
            myChampion.heal();
            console.log(`${myChampion.name} heals himself`);
            console.log(`${myChampion.name}'s life : ${myChampion.health}`)
          }
        } else {
          console.log('There is a problem with your choice');
        }
      }
    }
    if(deadChampions.length > 0) {
      deadChampions.forEach((indexChampion: number) => {
        champions = champions.filter((champion: Champion, index: number) => {
          return index !== indexChampion;
        })  
      });
    }

    if (champions.length === 1) {
      champions.forEach((champion: Champion) => {
        console.log(`Congrats ${champion.name}, you're the winner !!!`);
      })

      isEnded = true;
    }    
  } while (!isEnded);

})();