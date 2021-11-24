const commonTasks = require('common.tasks');
const roleFlagHarvester = require('role.flagHarvester');

let roomStructures = [];
let roomContainers = [];
let minerContainers = [];
let otherContainers = [];

module.exports = {


    run: function(creep) {

        let flag = Game.flags[creep.memory.myFlag];

        if(flag){

            roomStructures = [];
            roomContainers = [];
            minerContainers = [];
            otherContainers = [];

            this.setRoomStructures(creep);


            if(creep.room == flag.room){

                if((_.sum(creep.carry) == 0 && creep.memory.status == 'working')){
                    
                    creep.memory.status = 'collecting';
                    
                }else if(_.sum(creep.carry) == creep.carryCapacity){
                    
                    creep.memory.status = 'working';
                    if(creep.memory.source){
                        delete creep.memory.source;
                    }
                }


                if(creep.memory.status == 'collecting'){

                    let droppedResource = commonTasks.pickInRoom(creep, creep.store.getFreeCapacity());

                    if(droppedResource){
                        if(creep.pickup(droppedResource) == ERR_NOT_IN_RANGE){
                            creep.moveTo(droppedResource);
                        }
                    }else{
                        if(!commonTasks.collect(creep, roomContainers, otherContainers, minerContainers)){
                            commonTasks.harvest(creep);
                        }
                    }


                }else{

                    let site = Game.getObjectById(creep.memory.site);
                    if(site == null || !site instanceof ConstructionSite){
                        site = commonTasks.getConstructionSite(creep);
                    }

                    if(site != null){
                        if(creep.build(site) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(site, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }else{
                        roleFlagHarvester.run(creep);
                    }

                }

            }else if(!creep.fatige){
                //creep.drop(RESOURCE_ENERGY);
                creep.moveTo(flag, {reusePath: 10, visualizePathStyle: {stroke: '#ffaa00'}});

            }
        }
    },

    setRoomStructures: function(thisCreep){

        roomStructures = thisCreep.room.find(FIND_STRUCTURES);

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
    }
};