const commonTasks = require('common.tasks');
const roleFlagHarvester = require('role.flagHarvester');
const roleFlagReserver = require('role.flagReserver');
const roleFlagClaimer = require('role.flagClaimer');
const roleFlagBuilder = require('role.flagBuilder');
const roleFlagDefender = require('role.flagDefender');


module.exports = {

    run:function(creeps){
        
        for(var name in creeps) {
            
            let thisCreep = creeps[name];
            
            

            
            
            var droppedResources = thisCreep.pos.findInRange(FIND_DROPPED_RESOURCES, 3, {
                    filter: (r) => 
                        (r.resourceType == RESOURCE_ENERGY && r.amount >= 50)
                        || (r.resourceType != RESOURCE_ENERGY && r.amount >= 15)
                }
            );
            
            if(droppedResources.length > 0 && thisCreep.store.getFreeCapacity() > 0){
                commonTasks.pickAround(thisCreep, droppedResources);
            }else{
                switch(thisCreep.memory.role){

                    case 'flagHarvester':
                        if(Game.time%6 == 0 || (Game.time-1)%6 == 0) thisCreep.say('fH');
                        roleFlagHarvester.run(thisCreep);
                        break;
                        case 'flagReserver':
                            if(Game.time%6 == 0 || (Game.time-1)%6 == 0) thisCreep.say('fR');
                            roleFlagReserver.run(thisCreep);
                            break;
                    case 'flagClaimer':
                        if(Game.time%6 == 0 || (Game.time-1)%6 == 0) thisCreep.say('fC');
                        roleFlagClaimer.run(thisCreep);
                        break;
                    case 'flagBuilder':
                        if(Game.time%6 == 0 || (Game.time-1)%6 == 0) thisCreep.say('fB');
                        roleFlagBuilder.run(thisCreep);
                        break;
                    case 'flagDefender':
                        if(Game.time%6 == 0 || (Game.time-1)%6 == 0) thisCreep.say('fD');
                        roleFlagDefender.run(thisCreep);
                        break;
                }
            }
            
        }
    }
};