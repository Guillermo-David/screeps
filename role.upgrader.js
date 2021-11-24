var commonTasks = require('common.tasks');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep, roomContainers, otherContainers, minerContainers) {

        if(creep.memory.status == 'working' && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.status = 'collecting';
            creep.say('🔄 harvest');
	    }
	    if(creep.memory.status == 'collecting' && creep.store.getFreeCapacity() == 0) {
	        creep.memory.status = 'working';
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.status == 'working') {
	        
	        if(Game.time % 10 == 0){
	            delete creep.memory.myContainer;
	        }
	        
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else if(creep.memory.status == 'collecting') {
            
            if(!creep.memory.linkTo && creep.room.memory.linkTo != null){
                creep.memory.linkTo = creep.room.memory.linkTo;
            }
            
            let linkTo = Game.getObjectById(creep.memory.linkTo);
            if(linkTo){
                if(linkTo.store.energy > 0 && creep.withdraw(linkTo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(linkTo);
                }else{
                    commonTasks.collect(creep, roomContainers, otherContainers, minerContainers);
                }
            }else{
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
            }
        }
	}
};

module.exports = roleUpgrader;