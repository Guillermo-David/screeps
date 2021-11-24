var commonTasks = require('common.tasks');
var roleRepairer = require('role.repairer');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep, roomContainers, otherContainers, minerContainers) {

	    if(creep.memory.status == 'working' && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.status = 'collecting';
            creep.say('🔄 harvest');
	    }
	    if(creep.memory.status == 'collecting' && creep.store.getFreeCapacity() == 0) {
	        creep.memory.status = 'working';
	        creep.say('🚧 build');
	    }

	    if(creep.memory.status == 'working') {
	        
	        let site = Game.getObjectById(creep.memory.site);
	        if(site == null || !site instanceof ConstructionSite){
	            site = commonTasks.getConstructionSite(creep);
	        }

            if(site != null){
    	        if(creep.build(site) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(site, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                roleRepairer.run(creep);
            }
	    }
	    else if(creep.memory.status == 'collecting') {
	        commonTasks.collect(creep, roomContainers, otherContainers, minerContainers);
	    }
	}
};

module.exports = roleBuilder;