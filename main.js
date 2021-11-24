const memoryManager = require('manager.memory');
const roomManager = require('manager.rooms');
const roleManager = require('manager.role');
const flagManager = require('manager.flag');
const flagRoleManager = require('manager.flagRole');

/*
var commonTasks = require('common.tasks');
var towerManager = require('manager.tower');
var spawnManager = require('manager.spawns');
var creepManager = require('manager.creeps');
*/

module.exports.loop = function () {
    
    
    //Limio la memoria de los creeps
    memoryManager.clearMemory();
    
    
    //Gestiono cada room
    for(var r in Game.rooms) {

        let thisRoom = Game.rooms[r];
        roomManager.run(thisRoom);
        
    }
    
    roleManager.run(Game.creeps);
    flagRoleManager.run(Game.creeps);

    _.forEach(Game.flags, f => {            
        flagManager.run(f);
    });       
    
}
