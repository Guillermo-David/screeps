creepManager = require('manager.creeps');

module.exports = {
    
    run: function(creep){
        if(!creep.memory.myContainer){
            creepManager.getContainer(creep);
        }else if(creep.memory.inPosition == false){
            
            let myContainer = Game.getObjectById(creep.memory.myContainer);
            if(!creep.pos.isEqualTo(myContainer.pos)){
                creep.memory.inPosition = false;
                creep.moveTo(myContainer);
            }else{
                creep.memory.inPosition = true;
            }
            
        }else{
            
            if(!creep.memory.mySource || creep.memory.mySource == null){
                let mySource = creep.pos.findInRange(FIND_SOURCES,1);
                if(mySource.length > 0){
                    creep.memory.mySource = mySource[0].id;
                }
            }else{
                let mySource = Game.getObjectById(creep.memory.mySource);
                creep.harvest(mySource);
            }
        }
    }
};