roleUpgrader = require('role.upgrader');

module.exports = {
    run: function(creep){
        
        let toRepairId = creep.memory.toRepair;
        let toRepair = Game.getObjectById(toRepairId);
        
        if(toRepair == null || toRepair.hits >= toRepair.hitsMax * 0.75){
            
            toRepair = null;
            
            let idStructuresToRepair = creep.room.memory.toRepair;
            
            for(thisId in idStructuresToRepair){
                
                thisStructure = Game.getObjectById(thisId);
                if(thisStructure != null && thisStructure.hits < thisStructure.hitsMax * 0.75){
                    creep.memory.toRepair = thisId;
                    toRepair = thisStructure;
                    break;
                }
            }

            
            if(toRepair == null){
                creep.memory.toRepair = null;
            }
            
        }
        if(toRepair != null){
            if(creep.repair(toRepair) == ERR_NOT_IN_RANGE){
                creep.moveTo(toRepair);
            }
        }else{
            roleUpgrader.run(creep);
        }
    },
};