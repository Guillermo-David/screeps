/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('manager.memory');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    
    run:function(){
        
    },

    setRoomStructures: function(thisRoom, roomStructures){

        
        
    //All structures

        
        let roomStructuresIds = [];
        
        let roomContainers = [];
        let roomContainersIds = [];

        let minerContainers = [];
        let minerContainersIds = [];

        let otherContainers = [];
        let otherContainersIds = [];

        let toRepair = [];
        let idsToRepair = [];

        let droppedResources = [];
        let droppedResourcesIds = [];
        
        let enemies = [];
        let idsEnemies = [];

        let spawns = [];
        let spawnsIds = [];
        
        let storages = [];
        let roomCreeps = [];
        let roomMiners = [];

        
        _.forEach(roomStructures, s => {            
            roomStructuresIds.push(s.id);
        });
        
        thisRoom.memory.structures = roomStructuresIds;
        
    //Room containers   
        
        roomContainers = _.filter(roomStructures, function(s) {
                            return (s.structureType == STRUCTURE_CONTAINER);
                        });
        
        _.forEach(roomContainers, c => {            

            let sources = c.pos.findInRange(FIND_SOURCES, 1);
            roomContainersIds.push(c.id);
            
            if(sources.length  > 0){
                minerContainers.push(c);
                minerContainersIds.push(c.id);
            }else{
                otherContainers.push(c);
                otherContainersIds.push(c.id);
            }            
        });

        if(!thisRoom.memory.minerContainers){
            thisRoom.memory.minerContainers = {};
        }

        
        if(otherContainers.length > 0){
            thisRoom.memory.otherContainers = otherContainersIds;
        }else{
            thisRoom.memory.otherContainers = [];
        }

        if(roomContainers.length > 0){
            thisRoom.memory.roomContainers = roomContainersIds;
        }else{
            thisRoom.memory.roomContainers = [];
        }

    //Repair

        let controllerLevel = thisRoom.controller.level;
        if(controllerLevel - 2 < 1){
            controllerLevel = 1;
        }
        
        toRepair = _.filter(roomStructures, function(s) {
            return (
                (s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART &&  s.hits < s.hitsMax * 0.85) 
                || 
                ((s.structureType == STRUCTURE_WALL && s.hits < s.hitsMax * 0.00001 * controllerLevel *  controllerLevel)
                    || (s.structureType == STRUCTURE_RAMPART && s.hits < s.hitsMax * 0.0001 * controllerLevel *  controllerLevel)
                )
            );
        });

        for(let f in toRepair){
            idsToRepair.push(toRepair[f].id);
        }

        if(idsToRepair.length > 0){
            thisRoom.memory.toRepair = idsToRepair;
        }else{
            thisRoom.memory.toRepair = [];
        }

    //Spanws

        spawns = _.filter(roomStructures, function(s) {
            return (s.structureType == STRUCTURE_SPAWN);
        });

        _.forEach(spawns, s => {            
            spawnsIds.push(s.id);
        });

        thisRoom.memory.spawns = spawnsIds;

    //Storage

        storages = _.filter(roomStructures, function(s) {
            return (s.structureType == STRUCTURE_STORAGE);
        });

        if(storages.length > 0){
            thisRoom.memory.storage = storages[0].id;
        }

    //My Creeps
    
        thisRoom.memory.myCreeps = [];
        thisRoom.memory.toHeal = [];

        roomCreeps = thisRoom.find(FIND_MY_CREEPS);
        if(roomCreeps.length > 0){

            _.forEach(roomCreeps, c => {
                thisRoom.memory.myCreeps.push(c.name);
                if(c.hits < c.hitsMax){
                    thisRoom.memory.toHeal.push(c.name);
                }
            });
            
            _.forEach(minerContainers, c => {
                
                if (!(c.id in thisRoom.memory.minerContainers)){
                    thisRoom.memory.minerContainers[c.id] = new Array();
                }
            });
            
            roomMiners = _.filter(roomCreeps, function(c) {
                return (c.memory.role == 'miner');
            });
            
            if(!thisRoom.memory.minerContainers) thisRoom.memory.minerContainers = {};
            
            _.forEach(minerContainers, c => {
                if (!(c.id in thisRoom.memory.minerContainers)){
                    thisRoom.memory.minerContainers[c.id] = new Array();
                }
            });
        }
            
    //Enemies
        
        enemies = thisRoom.find(FIND_HOSTILE_CREEPS);
        for(let e in enemies){
            idsEnemies.push(enemies[e].id);
        }

        if(idsEnemies.length > 0){
            thisRoom.memory.enemies = idsEnemies;
        }else{
            thisRoom.memory.enemies = [];
        }

    //Dropped Resources

        droppedResources = thisRoom.find(FIND_DROPPED_RESOURCES);
        
        _.forEach(droppedResources, dr => {
            droppedResourcesIds.push(dr.id);
        });

        if(droppedResourcesIds.length > 0){
            thisRoom.memory.droppedResources = droppedResourcesIds;
        }else{
            thisRoom.memory.droppedResources = {};
        }

        return minerContainers;

    },

    clearMemory: function(){
        for(var name in Memory.creeps) {
            
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }

        for(var name in Memory.flags) {
            
            if(!Game.flags[name]) {
                delete Memory.flags[name];
            }
        }
    }
    
};