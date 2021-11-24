const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleMiner = require('role.miner');
const roleHauler = require('role.hauler');
const roleHealer = require('role.healer');
const commonTasks = require('common.tasks');


module.exports = {

    run:function(creeps){
        
        for(var name in creeps) {
            
            let thisCreep = creeps[name];

            //FIX: Estas cosas están guardadas en la memoria de la room
            let roomStructures = [];
            let roomStructuresIds = thisCreep.room.memory.structures;
            _.forEach(roomStructuresIds, id => {
                roomStructures.push(Game.getObjectById(id));
            });

            let roomContainers = [];
            let minerContainers = [];
            let otherContainers = [];

            roomContainers = _.filter(roomStructures, function(structure) {
                return (structure.structureType == STRUCTURE_CONTAINER);
            });

            _.forEach(roomContainers, c => {            
            let sources = c.pos.findInRange(FIND_SOURCES, 1);
            if(sources.length  > 0){
                minerContainers.push(c);
            }else{
                otherContainers.push(c);
            }
            }); 

            
            if(thisCreep.store[RESOURCE_ENERGY] == 0 && thisCreep.store.getFreeCapacity() < thisCreep.store.getCapacity()){
                
                this.unloadOtherResources(thisCreep);

            }else{
            
                var droppedResources = thisCreep.pos.findInRange(FIND_DROPPED_RESOURCES, 3, {
                        filter: (r) => 
                            (r.resourceType == RESOURCE_ENERGY && r.amount >= 50)
                            || (r.resourceType != RESOURCE_ENERGY && r.amount >= 15)
                    }
                );
                
                if(droppedResources.length > 0 && thisCreep.store.getFreeCapacity() > 0){
                    commonTasks.pickAround(thisCreep, droppedResources);
                }else{
                    switch(thisCreep.memory.role){
                        //console.log(thisCreep.memory.role);
                        case 'harvester':
                            if(Game.time%6 == 0 || (Game.time-1)%6 == 0) thisCreep.say('H');
                            //roleHarvester.run(thisCreep, roomContainers, otherContainers, minerContainers);
                            roleHarvester.run(thisCreep);
                            break;
                        case 'upgrader':
                            if(Game.time%6 == 0 || (Game.time-1)%6 == 0) thisCreep.say('U');
                            roleUpgrader.run(thisCreep, roomContainers, otherContainers, minerContainers);
                            break;
                        case 'builder':
                            if(Game.time%6 == 0 || (Game.time-1)%6 == 0) thisCreep.say('B');
                            roleBuilder.run(thisCreep, roomContainers, otherContainers, minerContainers);
                            break;
                        case 'miner':
                            if(Game.time%6 == 0 || (Game.time-1)%6 == 0) thisCreep.say('M');
                            //roleMiner.run(thisCreep, roomContainers, otherContainers, minerContainers);
                            roleMiner.run(thisCreep);
                            break;
                        case 'hauler':
                            if(Game.time%6 == 0 || (Game.time-1)%6 == 0) thisCreep.say('h');
                            roleHauler.run(thisCreep, roomContainers, otherContainers, minerContainers);
                            break;
                        case 'healer':
                            if(Game.time%6 == 0 || (Game.time-1)%6 == 0) thisCreep.say('heal');
                            roleHealer.run(thisCreep);
                            break;
                    }
                }
                
            }
        }
    },

    unloadOtherResources(thisCreep){
        let storage = Game.getObjectById(thisCreep.room.memory.storage);
        
        if(storage){
            
            if(thisCreep.store[RESOURCE_POWER] > 0){
                if(thisCreep.transfer(storage, RESOURCE_POWER) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_HYDROGEN] > 0){
                if(thisCreep.transfer(storage, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_OXYGEN] > 0){
                if(thisCreep.transfer(storage, RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_UTRIUM] > 0){
                if(thisCreep.transfer(storage, RESOURCE_UTRIUM) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_LEMERGIUM] > 0){
                if(thisCreep.transfer(storage, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_KEANIUM] > 0){
                if(thisCreep.transfer(storage, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_ZYNTHIUM] > 0){
                if(thisCreep.transfer(storage, RESOURCE_ZYNTHIUM) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_CATALYST] > 0){
                if(thisCreep.transfer(storage, RESOURCE_CATALYST) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_GHODIUM] > 0){
                if(thisCreep.transfer(storage, RESOURCE_GHODIUM) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_SILICON] > 0){
                if(thisCreep.transfer(storage, RESOURCE_SILICON) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_METAL] > 0){
                if(thisCreep.transfer(storage, RESOURCE_METAL) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_BIOMASS] > 0){
                if(thisCreep.transfer(storage, RESOURCE_BIOMASS) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_MIST] > 0){
                if(thisCreep.transfer(storage, RESOURCE_MIST) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_HYDROXIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_HYDROXIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_ZYNTHIUM_KEANITE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_ZYNTHIUM_KEANITE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_UTRIUM_LEMERGITE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_UTRIUM_LEMERGITE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_UTRIUM_HYDRIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_UTRIUM_HYDRIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_UTRIUM_OXIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_UTRIUM_OXIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_KEANIUM_HYDRIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_KEANIUM_HYDRIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_KEANIUM_OXIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_KEANIUM_OXIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_LEMERGIUM_HYDRIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_LEMERGIUM_HYDRIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_LEMERGIUM_OXIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_LEMERGIUM_OXIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_ZYNTHIUM_HYDRIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_ZYNTHIUM_HYDRIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_ZYNTHIUM_OXIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_ZYNTHIUM_OXIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_GHODIUM_HYDRIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_GHODIUM_HYDRIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_GHODIUM_OXIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_GHODIUM_OXIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_UTRIUM_ACID] > 0){
                if(thisCreep.transfer(storage, RESOURCE_UTRIUM_ACID) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_UTRIUM_ALKALIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_UTRIUM_ALKALIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_KEANIUM_ACID] > 0){
                if(thisCreep.transfer(storage, RESOURCE_KEANIUM_ACID) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_KEANIUM_ALKALIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_KEANIUM_ALKALIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_LEMERGIUM_ACID] > 0){
                if(thisCreep.transfer(storage, RESOURCE_LEMERGIUM_ACID) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_LEMERGIUM_ALKALIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_LEMERGIUM_ALKALIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_ZYNTHIUM_ACID] > 0){
                if(thisCreep.transfer(storage, RESOURCE_ZYNTHIUM_ACID) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_ZYNTHIUM_ALKALIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_ZYNTHIUM_ALKALIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_GHODIUM_ACID] > 0){
                if(thisCreep.transfer(storage, RESOURCE_GHODIUM_ACID) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_GHODIUM_ALKALIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_GHODIUM_ALKALIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_CATALYZED_UTRIUM_ACID] > 0){
                if(thisCreep.transfer(storage, RESOURCE_CATALYZED_UTRIUM_ACID) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_CATALYZED_UTRIUM_ALKALIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_CATALYZED_UTRIUM_ALKALIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_CATALYZED_KEANIUM_ACID] > 0){
                if(thisCreep.transfer(storage, RESOURCE_CATALYZED_KEANIUM_ACID) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_CATALYZED_KEANIUM_ALKALIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_CATALYZED_KEANIUM_ALKALIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_CATALYZED_LEMERGIUM_ACID] > 0){
                if(thisCreep.transfer(storage, RESOURCE_CATALYZED_LEMERGIUM_ACID) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_CATALYZED_ZYNTHIUM_ACID] > 0){
                if(thisCreep.transfer(storage, RESOURCE_CATALYZED_ZYNTHIUM_ACID) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_CATALYZED_GHODIUM_ACID] > 0){
                if(thisCreep.transfer(storage, RESOURCE_CATALYZED_GHODIUM_ACID) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_CATALYZED_GHODIUM_ALKALIDE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_CATALYZED_GHODIUM_ALKALIDE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_OPS] > 0){
                if(thisCreep.transfer(storage, RESOURCE_OPS) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_UTRIUM_BAR] > 0){
                if(thisCreep.transfer(storage, RESOURCE_UTRIUM_BAR) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_LEMERGIUM_BAR] > 0){
                if(thisCreep.transfer(storage, RESOURCE_LEMERGIUM_BAR) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_ZYNTHIUM_BAR] > 0){
                if(thisCreep.transfer(storage, RESOURCE_ZYNTHIUM_BAR) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_KEANIUM_BAR] > 0){
                if(thisCreep.transfer(storage, RESOURCE_KEANIUM_BAR) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_GHODIUM_MELT] > 0){
                if(thisCreep.transfer(storage, RESOURCE_GHODIUM_MELT) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_OXIDANT] > 0){
                if(thisCreep.transfer(storage, RESOURCE_OXIDANT) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_REDUCTANT] > 0){
                if(thisCreep.transfer(storage, RESOURCE_REDUCTANT) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_PURIFIER] > 0){
                if(thisCreep.transfer(storage, RESOURCE_PURIFIER) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_BATTERY] > 0){
                if(thisCreep.transfer(storage, RESOURCE_BATTERY) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_COMPOSITE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_COMPOSITE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_CRYSTAL] > 0){
                if(thisCreep.transfer(storage, RESOURCE_CRYSTAL) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_LIQUID] > 0){
                if(thisCreep.transfer(storage, RESOURCE_LIQUID) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_WIRE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_WIRE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_SWITCH] > 0){
                if(thisCreep.transfer(storage, RESOURCE_SWITCH) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_TRANSISTOR] > 0){
                if(thisCreep.transfer(storage, RESOURCE_TRANSISTOR) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_MICROCHIP] > 0){
                if(thisCreep.transfer(storage, RESOURCE_MICROCHIP) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_CIRCUIT] > 0){
                if(thisCreep.transfer(storage, RESOURCE_CIRCUIT) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_DEVICE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_DEVICE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_CELL] > 0){
                if(thisCreep.transfer(storage, RESOURCE_CELL) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_PHLEGM] > 0){
                if(thisCreep.transfer(storage, RESOURCE_PHLEGM) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_TISSUE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_TISSUE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_MUSCLE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_MUSCLE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_ORGANOID] > 0){
                if(thisCreep.transfer(storage, RESOURCE_ORGANOID) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_ORGANISM] > 0){
                if(thisCreep.transfer(storage, RESOURCE_ORGANISM) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_ALLOY] > 0){
                if(thisCreep.transfer(storage, RESOURCE_ALLOY) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_TUBE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_TUBE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_FIXTURES] > 0){
                if(thisCreep.transfer(storage, RESOURCE_FIXTURES) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_FRAME] > 0){
                if(thisCreep.transfer(storage, RESOURCE_FRAME) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_HYDRAULICS] > 0){
                if(thisCreep.transfer(storage, RESOURCE_HYDRAULICS) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_MACHINE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_MACHINE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_CONDENSATE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_CONDENSATE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_CONCENTRATE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_CONCENTRATE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_EXTRACT] > 0){
                if(thisCreep.transfer(storage, RESOURCE_EXTRACT) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_SPIRIT] > 0){
                if(thisCreep.transfer(storage, RESOURCE_SPIRIT) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_EMANATION] > 0){
                if(thisCreep.transfer(storage, RESOURCE_EMANATION) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } else if(thisCreep.store[RESOURCE_ESSENCE] > 0){
                if(thisCreep.transfer(storage, RESOURCE_ESSENCE) == ERR_NOT_IN_RANGE){
                    thisCreep.moveTo(storage);
                }
            } 
        }
    }
};