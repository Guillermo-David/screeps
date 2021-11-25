module.exports = {

    /*
    run: function(){
        for(var name in Game.creeps){
        
            let thisCreep = Game.creeps[name];
            if(thisCreep.ticksToLive > 1450){
                
                if(thisCreep.memory.myContainer){
                    
                    for(let i in thisCreep.room.memory.minerContainers){
    
                        let thisMemory = thisCreep.room.memory.minerContainers[i];
                        
                        if(thisMemory[0] != thisCreep.id && thisMemory[1] == thisCreep.memory.myContainer){
                            let newMemory = [thisCreep.id, thisCreep.memory.myContainer];
                            thisMemory = newMemory;
                        }
                    }
                }
            }
        }
    },
    */
    
    getContainer: function(thisCreep){
        if(thisCreep.memory.role == 'miner'){
            
            for(let i in thisCreep.room.memory.minerContainers){
                
                let thisContainer = thisCreep.room.memory.minerContainers[i];
                
                if(!thisContainer || thisContainer == null){
                    thisCreep.room.memory.minerContainers[i] = thisCreep.id;
                    thisCreep.memory.myContainer = i; 
                    break;
                }else{
                    let containerOwner = Game.getObjectById(thisContainer);
                    
                    if(!containerOwner){
                        thisCreep.room.memory.minerContainers[i] = null;
                    }
                }
            }
        }
    }
};