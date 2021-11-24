const commonTasks = require('common.tasks');

module.exports = {
    run: function(creep) {
        
        let flag = Game.flags[creep.memory.myFlag];
        
        if(!flag){
            if(Game.time%5 == 0) creep.say(creep.room.name + ": " + creep.name + " dice: No tengo flag");
        }else if(creep.room == flag.room){
            //let myTarget = 
            let enemies = creep.room.find(FIND_HOSTILE_CREEPS);
            let enemy = null;
            
            if(enemies.length > 0){
                
                for(let i in enemies){
                    let healer = enemies[i].getActiveBodyparts(HEAL);
                    if(healer){
                        enemy = enemies[i];
                    }                  
                }
                
                if(!enemy){
                    enemies = _.sortBy(enemies, e => creep.pos.getRangeTo(e));
                    enemy = enemies[0];
                }
            }
            
            if(enemy){
                
                console.log(commonTasks.distanceSq(creep, enemy));
                
                if(commonTasks.distanceSq(creep, enemy) < 4){
                    //FIX esto no funciona
                    let path = PathFinder.search(creep.pos, enemy.pos,{flee:true}).path;
                    creep.moveByPath(path);
                }
                if(creep.rangedAttack(enemy) == ERR_NOT_IN_RANGE && !creep.fatige){
                    creep.moveTo(enemy, {reusePath: 10,visualizePathStyle: {stroke: '#ff0000'}});
                }
                
            }else{
                let enemyStructures = creep.room.find(FIND_HOSTILE_STRUCTURES);

                if(enemyStructures.length > 0){
                    creep.rangedAttack(enemyStructures[0]);
                }else if(creep.pos != flag.pos){
                    creep.moveTo(flag);
                }
            }
            /*
            else{
                var terrain = creep.room.lookForAt(LOOK_STRUCTURES, flag.pos);
                if(terrain.length){
                    for(let name in terrain){
                        
                        if(terrain[name].structureType == STRUCTURE_WALL) {
                            
                            var attackResult = creep.attack(terrain[name]);
                            if(attackResult  == ERR_NOT_IN_RANGE && !creep.fatige){
                            creep.moveTo(terrain[name], {reusePath: REUSE_PATH});
                            }
                        }
                    }
                }
                if(!creep.fatige){
                    creep.moveTo(flag, {reusePath: REUSE_PATH, visualizePathStyle: {stroke: '#99b3ff'}});
                }
            }
            */
        
        }else if(!creep.fatige){
            creep.moveTo(flag, {reusePath: 10, visualizePathStyle: {stroke: '#ffffff'}});
            
        }
    }
};