/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.flagReserver');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

    run: function(creep) {
        let targetFlag = Game.flags[creep.memory.myFlag];
        let ctrl = creep.room.controller;
        
        
        if(targetFlag){
            
            if(creep.room === targetFlag.room){
                if(!creep.fatige && creep.reserveController(ctrl) == ERR_NOT_IN_RANGE){
                    creep.moveTo(ctrl, {reusePath: 10, visualizePathStyle: {stroke: '#cc00cc'}});
                }
            }else if(!creep.fatige){
                creep.moveTo(targetFlag, {reusePath: 10, visualizePathStyle: {stroke: '#cc00cc'}});
                
            }

        }
    }
};