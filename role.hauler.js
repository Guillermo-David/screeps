var commonTasks = require('common.tasks');

module.exports = {

    run:function(creep, roomContainers, otherContainers, minerContainers){
        
        var task = creep.memory.status;
        
        if(task == 'working' && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.status = 'collecting';
            task = creep.memory.status;
	    }
	    if(task == 'collecting' && creep.store.getFreeCapacity() == 0) {
	        creep.memory.status = 'working';
	        task = creep.memory.status;
	    }
	    
	    
	    
	    
	    if(task == 'collecting') {
            
            let droppedResource = commonTasks.pickInRoom(creep, creep.store.getFreeCapacity());

            if(droppedResource){
                if(creep.pickup(droppedResource) == ERR_NOT_IN_RANGE){
                    creep.moveTo(droppedResource);
                }
            }else{
                let collectResult = commonTasks.collect(creep, roomContainers, otherContainers, minerContainers);
                
                if(!collectResult){
                    if(creep.room.memory.storage){
                        let storage = Game.getObjectById(creep.room.memory.storage);
    
                        if(storage != null){
                            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(storage, {visualizePathStyle: {stroke: '#1111ff'}});
                            }
                        }
                    }
                }
            }

        
	        
	    } else if(task == 'working') {
            
            let targetsIds = creep.room.memory.structures;
            let targets = [];
            let towers = [];

            _.forEach(targetsIds, id => {
                let s = Game.getObjectById(id);
                if((s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                    targets.push(s);
                }else if(s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity * 0.75){
                    towers.push(s);
                }
            });
            
            if(targets.length > 0) {
                
                targets = _.sortBy(targets, t => creep.pos.getRangeTo(t));
                
                let target = targets[0];
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                
            }else if(towers.length > 0){
                
                towers = _.sortBy(towers, t => creep.pos.getRangeTo(t));
                
                let tower = towers[0];
                if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower, {visualizePathStyle: {stroke: '#ffffff'}});
                }

            }else{
                
                var linkFrom = null;

                if(creep.room.memory.linksFrom){
                    let idsLinksFrom = creep.room.memory.linksFrom;
                    let linksFrom = [];

                    for(i in idsLinksFrom){
                        let thisLinkFrom = Game.getObjectById(idsLinksFrom[i]);
                        if(thisLinkFrom){
                            linksFrom.push(thisLinkFrom);
                        }
                    }

                    if(linksFrom.length > 0){
                        linksFrom = _.sortBy(linksFrom, l => creep.pos.getRangeTo(l));
                        linkFrom = linksFrom[0];
                    }
                }
                
                if(!linkFrom){
                     _.forEach(otherContainers, c => {
                        targets.push(c);
                    });
                    if(targets.length > 0){
                        target = targets[0];
                        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
                ///*
                else if(linkFrom.store.energy < linkFrom.energyCapacity){
                    if(creep.transfer(linkFrom, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(linkFrom);
                    }
                }
                //*/
                else{
                    creep.memory.status = 'collecting';
                }
            }
        }
    }
};