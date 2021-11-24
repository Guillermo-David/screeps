/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.flagClaimer');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

    run: function(creep) {

        let flag = Game.flags[creep.memory.myFlag];
        let ctrl = creep.room.controller;        

        if(!flag){
            if(Game.time%5 == 0) creep.say(creep.room.name + ": " + creep.name + " dice: No tengo flag");
        }else{
            console.log(creep.claimController(ctrl));
            if(creep.room == flag.room){
                if(!creep.fatige && creep.claimController(ctrl) == ERR_NOT_IN_RANGE){
                    creep.moveTo(ctrl, {reusePath: 10, visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }else if(!creep.fatige){
                creep.moveTo(flag, {reusePath: 10, visualizePathStyle: {stroke: '#ffaa00'}});
                
            }
        }
    }
};