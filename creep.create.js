/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('creep.create');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

    run: function(thisRoom, creepBody, creepName, creepMemory, extendedMemory){        

        let spawn = this.setSpawn(thisRoom);
        
        if(spawn != null){
            
            if(!spawn.spawning) { 
                
                //console.log(JSON.stringify(creepMemory));

                if(extendedMemory != null){
                    Object.assign(creepMemory.memory, extendedMemory);
                }
                
                let mySpawn = {mySpawn:spawn.name};
                Object.assign(creepMemory.memory, mySpawn);
                spawn.spawnCreep(creepBody, creepName, creepMemory);                
                
            }
        }
    },
    
    setSpawn: function(thisRoom){

        let thisRoomSpawnsIds = thisRoom.memory.spawns;        

        _.forEach(thisRoomSpawnsIds, id => {

            let s = Game.getObjectById(id);

            if(!s.spawning){
                return s;
            }
        });
    }

};