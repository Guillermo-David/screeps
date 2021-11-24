/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.healer');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

    run: function(creep){
        
        let toHeal = [];

        if(!creep.memory.toHeal){

            _.forEach(creep.room.memory.toHeal, name => {
                let thisCreep = Game.creeps[name];
                if(thisCreep){
                    toHeal.push(thisCreep);
                }
            });
            
            //console.log(1);
            if(toHeal.length > 0){
                toHeal = _.sortBy(toHeal, c => c.hits);
                creep.memory.toHeal = toHeal[0].name;
            }
        }else{

            let target = Game.creeps[creep.memory.toHeal];

            if(target && target.hits < target.hitsMax){

                if(creep.heal(target) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
            }else{
                delete creep.memory.toHeal;
            }
        }
    }
};