const memoryManager = require('manager.memory');
const roomManager = require('manager.rooms');
const roleManager = require('manager.role');
const flagManager = require('manager.flag');
const flagRoleManager = require('manager.flagRole');
const profiler = require('screeps-profiler');

//Game.spawns['Spawn3'].spawnCreep([MOVE, HEAL], 'Ambulancia', {memory:{role:'healer'}});  

profiler.enable();
module.exports.loop = function () {
    
    //Limio la memoria de los creeps
    memoryManager.clearMemory();
    
    
    //Gestiono cada room
    profiler.wrap(function() {
        
        for(var r in Game.rooms) {
            
            let thisRoom = Game.rooms[r];
            roomManager.run(thisRoom);
            
        }
    });
    
    roleManager.run(Game.creeps);
    flagRoleManager.run(Game.creeps);

    _.forEach(Game.flags, f => {            
        flagManager.run(f);
    });       
    
}
