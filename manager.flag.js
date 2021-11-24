var commonTasks = require('common.tasks');
var createCreep = require('creep.create');

var desiredMinions = 0;
var currentMinions = 0;
var currentHealers = 0;
var ticksToDie = 100;

module.exports = {

    run: function(thisFlag){

        let thisFlagName = thisFlag.name;

        currentMinions = 0;
        currentHealers = 0;
        desiredMinions = 0;
        
        this.countCreeps(thisFlag);

        let splitResult = thisFlagName.split('.');

        if(splitResult.length != 3 || !Number.isInteger(parseInt(splitResult[2]))){
            console.log('La bandera ' + thisFlagName + ' tiene un nombre incorrecto');
            return;
        }

        let targetRoomName = splitResult[0];
        let targetRoom = Game.rooms[targetRoomName];

        let flagRole = splitResult[1];
        
        desiredMinions = parseInt(splitResult[2]);
        thisFlag.memory.desiredMinions = desiredMinions;

        //console.log(thisFlagName + ": " + currentMinions + "/" + desiredMinions);

        if(thisFlag.color != COLOR_RED){
            switch(flagRole){
                case 'harvester':
                    targetRoom.memory.desiredFlagHarvesters = desiredMinions;
                break;
                case 'reserver':
                    targetRoom.memory.desiredFlagReservers = desiredMinions;    
                break;
                case 'claimer':
                    targetRoom.memory.desiredFlagClaimers = desiredMinions;     
                break;
                case 'defender':
                //Si no hay creeps, no creo bichos, y así puedo tener una bandera amarilla siempre
                    let enemies = [];
                    if(Game.time%10 == 0){
                        try {
                            enemies = thisFlag.room.find(FIND_HOSTILE_CREEPS);
                        }catch(err) {
                            //Si no hay creeps en la misma habitación que la bandera
                            //no se puede hacer un find.
                        }
                    }

                    if(!enemies.length > 0) desiredMinions = 0;
                    targetRoom.memory.desiredFlagDefenders = desiredMinions;
                break;
                case 'builder':
                    targetRoom.memory.desiredFlagBuilders = desiredMinions;     
                break;
                default:break;
            }

            if(currentMinions < desiredMinions){
                
                let extendedMemory = {};
                let creepRole = '';
                let creepName = '';
                let creepBody = [];
                let creepMemory = '';

                
                switch(flagRole){
                    
                    //HARVEST
                    case 'harvester':
                        creepRole = 'flagHarvester';
                        creepName = creepRole.charAt(0).toUpperCase() + creepRole.slice(1) + Game.time;
                        creepBody = commonTasks.defineCreepBody(targetRoom, creepRole);
                        creepMemory = {memory:{
                            myRoom: targetRoomName,
                            myFlag: thisFlagName,
                            role: creepRole,
                            status: 'loading'
                        }};
                        extendedMemory = null;
                    break;
//RESERVE
                    case 'reserver':
                        creepRole = 'flagReserver';
                        creepName = creepRole.charAt(0).toUpperCase() + creepRole.slice(1) + Game.time;
                        creepBody = commonTasks.defineCreepBody(targetRoom, creepRole);
                        creepMemory = {memory:{
                            myRoom: targetRoomName,
                            myFlag: thisFlagName,
                            role: creepRole,
                            status: 'collecting'
                        }};
                        extendedMemory = null;
                    break;
// CLAIM
                    case 'claimer':
                        creepRole = 'flagClaimer';
                        creepName = creepRole.charAt(0).toUpperCase() + creepRole.slice(1) + Game.time;
                        creepBody = commonTasks.defineCreepBody(targetRoom, creepRole);
                        creepMemory = {memory:{
                            myRoom: targetRoomName,
                            myFlag: thisFlagName,
                            role: creepRole,
                            status: 'collecting'
                        }};
                        extendedMemory = null;
                    break;
//DEFEND!
                    case 'defender':
                        creepRole = 'flagDefender';
                        creepName = creepRole.charAt(0).toUpperCase() + creepRole.slice(1) + Game.time;
                        creepBody = commonTasks.defineCreepBody(targetRoom, creepRole);
                        creepMemory = {memory:{
                            myRoom: targetRoomName,
                            myFlag: thisFlagName,
                            role: creepRole,
                            status: 'collecting'
                        }};
                        extendedMemory = null;
                    break;
//BUILD/ASSIST NEW ROOM
                    case 'builder':
                        creepRole = 'flagBuilder';
                        creepName = creepRole.charAt(0).toUpperCase() + creepRole.slice(1) + Game.time;
                        creepBody = commonTasks.defineCreepBody(targetRoom, creepRole);
                        creepMemory = {memory:{
                            myRoom: targetRoomName,
                            myFlag: thisFlagName,
                            role: creepRole,
                            status: 'collecting'
                        }};
                        extendedMemory = null;
                    break;
                    
                    default:                        
                    break;
                }                
                
                //console.log(JSON.stringify(creepMemory));
                createCreep.run(targetRoom, creepBody, creepName, creepMemory, extendedMemory);                
                
            }
        }
    },
    
    countCreeps: function(thisFlag){

        for(let i in Game.creeps){

            let creep = Game.creeps[i];

            if(creep.memory.myFlag == thisFlag.name && creep.memory.role == 'flagHealer'){// && creep.ticksToLive > 100){
                
                currentHealers++;

            }else if(creep.memory.myFlag == thisFlag.name){// && creep.ticksToLive > 100){
            
                currentMinions++;
            }
        }

        thisFlag.memory.currentMinions = currentMinions;
        thisFlag.memory.currentHealers = currentHealers;
    }
};