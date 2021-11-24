/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('manager.tower');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    
    run: function(tower){
        let idsEnemies = tower.room.memory.enemies;
        let toHeal = [];
        
        //console.log(tower.id + ": " + tower.store[RESOURCE_ENERGY] +'/'+ tower.energyCapacity);
        if(idsEnemies.length > 0){
            
            let enemies = [];
            for(let i in idsEnemies){
                enemies.push(Game.getObjectById(idsEnemies[i]));
            }
            let target = tower.pos.findClosestByRange(enemies);
            tower.attack(target);
        }else if (tower.energy > (tower.energyCapacity)*0.5){
            
            let idsToRepair = tower.room.memory.toRepair;
            let toRepair = [];

            if(idsToRepair.length > 0){
                for(let i in idsToRepair){
                    toRepair.push(Game.getObjectById(idsToRepair[i]));
                }
                toRepair = _.sortBy(toRepair, structure => structure.hits);
                tower.repair(toRepair[0]);
            }
        }else {
            
            _.forEach(thisRoom.memory.toHeal, name => {
                let thisCreep = Game.creeps[name];
                if(thisCreep){
                    toHeal.push(thisCreep);
                }
            });
                    
            if(toHeal.length > 0){
                toHeal = _.sortBy(toHeal, c => c.hits);
                tower.heal(toHeal[0]);
            }
        }
    }
};