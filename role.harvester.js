var roleBuilder = require('role.builder');
var commonTasks = require('common.tasks')

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var task = creep.memory.status;
        
        if(task == 'working' && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.status = 'collecting';
            task = creep.memory.status;
            creep.say('🔄 harvest');
	    }
	    if(task == 'collecting' && creep.store.getFreeCapacity() == 0) {
	        creep.memory.status = 'working';
	        task = creep.memory.status;
	        creep.say('⚡ upgrade');
	    }
	    
	    if(task == 'collecting') {

            let droppedResource = commonTasks.pickInRoom(creep, creep.store.getFreeCapacity());

            if(droppedResource){
                if(creep.pickup(droppedResource) == ERR_NOT_IN_RANGE){
                    creep.moveTo(droppedResource);
                }
            }else{
                commonTasks.harvest(creep);
            }
        } 
        
        if(task == 'working') {
            
            let roomStructuresIds = creep.room.memory.structures;
            let targets = [];

            _.forEach(roomStructuresIds, id => {

                let s = Game.getObjectById(id);

                if(((s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0) 
                        ||
                        (s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity * 0.75)){
                    targets.push(s);
                }
            });

            targets = _.sortBy(targets, t => creep.pos.getRangeTo(t));
            
            if(targets.length > 0) {
                
                //let target = creep.pos.findClosestByPath(targets);
                let target = targets[0];
                
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                roleBuilder.run(creep);
                //roleUpgrader.run(creep);
            }
        }
	}
};

module.exports = roleHarvester;