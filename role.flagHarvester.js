const commonTasks = require('common.tasks');

module.exports = {

    run: function(creep) {

        let flag = Game.flags[creep.memory.myFlag];
        let mySpawn = null;
        
        /*
        if(creep.memory.dead != true && creep.ticksToLive < TICKS_TO_DIE){
            creep.memory.dead = true;
        }
        */
        
        if((_.sum(creep.carry) == 0)){
            //console.log(creep.name);
            creep.memory.status = 'loading';
        }else if(_.sum(creep.carry) == creep.carryCapacity){
            creep.memory.status = 'unloading';
            if(creep.memory.source){
                //delete creep.memory.source;
            }
        }
        
        
        let creepRoom = creep.memory.myRoom;
        let curRoom = creep.room.name;
        


//Miro en qué habitación está
        if(!flag){
            if(Game.time%5 == 0) creep.say(creep.room.name + ": " + creep.name + " dice: No tengo flag");
    //Si está en myRoom
        }else if(creep.pos.roomName == creep.memory.myRoom){

            if(creep.memory.status == 'loading'){
                    
                if(!creep.fatige){
                    creep.moveTo(flag, {reusePath: 10, visualizePathStyle: {stroke: '#668cff'}});
                }
                
            }else{
                commonTasks.doWhileMoving(creep);
                this.unload(creep);

            }    
            
            
    //Si está en la flagRoom
        }else if(creep.pos.roomName == flag.pos.roomName){

            if(creep.memory.status == 'loading'){
                
                let droppedResource = commonTasks.pickInRoom(creep, creep.store.getFreeCapacity());

                if(droppedResource){
                    if(creep.pickup(droppedResource) == ERR_NOT_IN_RANGE){
                        creep.moveTo(droppedResource);
                    }
                }else{
                    commonTasks.harvest(creep);
                }
                
            }else{
                commonTasks.doWhileMoving(creep);
                mySpawn = Game.spawns[creep.memory.mySpawn];
                creep.moveTo(mySpawn, {reusePath: 10, visualizePathStyle: {stroke: '#668cff'}});
                //this.doWhileMoving(creep);
                
            }
            
        }else{
            
            if(creep.memory.status == 'loading'){
                    
                if(!creep.fatige){
                    creep.moveTo(flag, {reusePath: 10, visualizePathStyle: {stroke: '#668cff'}});
                }
                
            }else{
                
                if(!creep.fatige){
                    mySpawn = Game.spawns[creep.memory.mySpawn];
                    creep.moveTo(mySpawn, {reusePath: 10, visualizePathStyle: {stroke: '#668cff'}});
                    //this.doWhileMoving(creep);
                }
            }
        }
    },

    unload: function(creep){
        let targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((
                    structure.structureType == STRUCTURE_LINK 
                    || structure.structureType == STRUCTURE_STORAGE 
                    || structure.structureType == STRUCTURE_CONTAINER
                    || structure.structureType == STRUCTURE_SPAWN
                    || structure.structureType == STRUCTURE_EXTENSION
                    ) && 
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
                    ||
                    (structure.structureType == STRUCTURE_TOWER &&
                    structure.energyCapacityAvailable > creep.carry.energy) 
            }
        });

        if(targets.length > 0) {
            
            let target = creep.pos.findClosestByPath(targets);
            
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};