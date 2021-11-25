const linkManager = require('manager.link');
const towerManager = require('manager.tower');
const countCreeps = require('creep.count');
const memoryManager = require('manager.memory');




module.exports = {

    run: function(thisRoom){
        
        

        if(thisRoom.controller && thisRoom.controller.my){     
            
            linkManager.run(thisRoom);
            
            let roomStructures = thisRoom.find(FIND_STRUCTURES);
            let minerContainers = memoryManager.setRoomStructures(thisRoom, roomStructures);

            let towers = _.filter(roomStructures, function(structure) {
                return (structure.structureType == STRUCTURE_TOWER);
            });
            
            let towerIds = [];
            _.forEach(towers, t => {            

                towerIds.push(t.id);
                towerManager.run(t);
                
            });
             
            countCreeps.run(thisRoom, minerContainers);
        }
        
        
        
        
    }
};