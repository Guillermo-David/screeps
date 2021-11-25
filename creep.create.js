let spawn = null;

module.exports = {

    run: function(thisRoom, creepBody, creepName, creepMemory, extendedMemory){        

        this.setSpawn(thisRoom);
        //console.log(spawn.name);
        if(spawn != null){
            
                if(extendedMemory != null){
                    Object.assign(creepMemory.memory, extendedMemory);
                }
                
                let mySpawn = {mySpawn : spawn.name};
                Object.assign(creepMemory.memory, mySpawn);
                spawn.spawnCreep(creepBody, creepName, creepMemory);                
                    
        }
    },
    
    setSpawn: function(thisRoom){

        let thisRoomSpawnsIds = thisRoom.memory.spawns;        
        let foundSpawn = false;

        _.forEach(thisRoomSpawnsIds, id => {

            let s = Game.getObjectById(id);
            if(!s.spawning){
                spawn = s;
                foundSpawn = true;
            }            
        });

        if(!foundSpawn){
            spawn = null;
        }
    }

};