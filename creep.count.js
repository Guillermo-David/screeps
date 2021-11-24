let createCreep = require('creep.create');
var commonTasks = require('common.tasks');


module.exports = {

    run:function(thisRoom, minerContainers){

        let creepNeeded = false;
        let creepMemory = {};
        let role = '';
        //let spawnName = 'Spawn1';
        let constructionSites = [];
        let constructionSitesIds = thisRoom.memory.constructionSites;

        _.forEach(constructionSitesIds, id => {

            let cs = Game.getObjectById(id);
            if(cs){
                constructionSites.push(cs);
            }
        });
        
        let allCreeps = Game.creeps;

    //Cuento cuántos creeps de cada tipo hay 
        let harvesters      = _.filter(allCreeps, (creep) => creep.memory.role == 'harvester'       && creep.memory.myRoom == thisRoom.name);// && creep.ticksToLive > 50);
        let upgraders       = _.filter(allCreeps, (creep) => creep.memory.role == 'upgrader'        && creep.memory.myRoom == thisRoom.name);// && creep.ticksToLive > 50);
        let builders        = _.filter(allCreeps, (creep) => creep.memory.role == 'builder'         && creep.memory.myRoom == thisRoom.name);// && creep.ticksToLive > 50);
        let miners          = _.filter(allCreeps, (creep) => creep.memory.role == 'miner'           && creep.memory.myRoom == thisRoom.name);// && creep.ticksToLive > 50);
        let haulers         = _.filter(allCreeps, (creep) => creep.memory.role == 'hauler'          && creep.memory.myRoom == thisRoom.name);// && creep.ticksToLive > 50);
    /*
        let flagHarvesters  = _.filter(allCreeps, (creep) => creep.memory.role == 'flagHarvester'   && creep.memory.myRoom == thisRoom.name);
        let flagReservers   = _.filter(allCreeps, (creep) => creep.memory.role == 'flagReserver'    && creep.memory.myRoom == thisRoom.name);
        let flagBuilders    = _.filter(allCreeps, (creep) => creep.memory.role == 'flagBuilder'    && creep.memory.myRoom == thisRoom.name);
    */
    
    //En caso de no haber, su valor será "undefined"
        if(!harvesters)     harvesters = {};
        if(!upgraders)      upgraders = {};
        if(!builders)       builders = {};
        if(!miners)         miners = {};
        if(!haulers)        haulers = {};
    /*
        if(!flagHarvesters) flagHarvesters = {};
        if(!flagReservers)  flagReservers = {};
        if(!flagBuilders)    flagBuilder = {};
    */
    //Escribo en memoria la cantidad deseada de cada tipo de creep básico
        this.setDesiredCreeps(thisRoom, minerContainers, constructionSites);     
        
    //En caso de no existir los registros en la memoria los establezco a 0
        if(!thisRoom.memory.desiredHarvesters)     thisRoom.memory.desiredHarvesters = 0;
        if(!thisRoom.memory.desiredUpgraders)      thisRoom.memory.desiredUpgraders = 0;
        if(!thisRoom.memory.desiredBuilders)       thisRoom.memory.desiredBuilders = 0;
        if(!thisRoom.memory.desiredMiners)         thisRoom.memory.desiredMiners = 0;
        if(!thisRoom.memory.desiredHaulers)        thisRoom.memory.desiredHaulers = 0;
    /*
        if(!thisRoom.memory.desiredFlagHarvesters) thisRoom.memory.desiredFlagHarvesters = 0;
        if(!thisRoom.memory.desiredFlagReservers)  thisRoom.memory.desiredFlagReservers = 0;
        if(!thisRoom.memory.desiredFlagBuilders)   thisRoom.memory.desiredFlagBuilders = 0;
    */
   
    //Establezco la cantidad deseada de cada tipo de creep básico
        let desiredHarvesters       = thisRoom.memory.desiredHarvesters;
        let desiredUpgraders        = thisRoom.memory.desiredUpgraders;
        let desiredBuilders         = thisRoom.memory.desiredBuilders;
        let desiredMiners           = thisRoom.memory.desiredMiners;
        let desiredHaulers          = thisRoom.memory.desiredHaulers;
    /*
        let desiredFlagHarvesters   = thisRoom.memory.desiredFlagHarvesters;
        let desiredFlagReservers    = thisRoom.memory.desiredFlagReservers;
        let desiredFlagBuilders     = thisRoom.memory.desiredFlagBuilders;
    */
    //Preparo la que será la memoria del creep que se cree
        let harvesterMemory     =   {memory: {role: 'harvester',    status: 'collecting', myRoom:thisRoom.name}};
        let upgraderMemory      =   {memory: {role: 'upgrader',     status: 'collecting', myRoom:thisRoom.name}};
        let builderMemory       =   {memory: {role: 'builder',      status: 'collecting', myRoom:thisRoom.name}};
        let minerMemory         =   {memory: {role: 'miner',        status: 'collecting', myRoom:thisRoom.name, inPosition:false, mySource:null}};
        let haulerMemory        =   {memory: {role: 'hauler',       status: 'collecting', myRoom:thisRoom.name}};
        //let flagHarvesterMemory =   {memory: {role: 'flagHarvester',status: 'collecting', myRoom:thisRoom.name}};
        
    //EJEMPLO
    /*
        Object.assign(flagHarvesterMemory.memory, {"teamId":"4", "asd":"asdasd"});
        console.log(JSON.stringify(flagHarvesterMemory));
    */

    //ROOM VISUALS
        thisRoom.visual.text("H: " + harvesters.length + "/" + desiredHarvesters, 1, 1, {align: 'left', opacity: 0.8});
        thisRoom.visual.text("U: " + upgraders.length + "/" + desiredUpgraders  , 1, 2, {align: 'left', opacity: 0.8});
        thisRoom.visual.text("B: " + builders.length + "/" + desiredBuilders    , 1, 3, {align: 'left', opacity: 0.8});
        thisRoom.visual.text("h: " + haulers.length + "/" + desiredHaulers      , 1, 4, {align: 'left', opacity: 0.8});
        thisRoom.visual.text("M: " + miners.length + "/" + desiredMiners        , 1, 5, {align: 'left', opacity: 0.8});
    /*
        thisRoom.visual.text("fH: " + flagHarvesters.length + "/" + desiredFlagHarvesters,  1, 6, {align: 'left', opacity: 0.8});
        thisRoom.visual.text("fR: " + flagReservers.length + "/" + desiredFlagReservers,    1, 7, {align: 'left', opacity: 0.8});
        thisRoom.visual.text("fB: " + flagBuilders.length + "/" + desiredFlagBuilders,      1, 8, {align: 'left', opacity: 0.8});
    */

    //Decido si es necesario crear un creep
        if(harvesters.length < desiredHarvesters) {
            
            creepNeeded = true;
            role = 'harvester'
            creepMemory = harvesterMemory;
                
        }else if(miners.length < desiredMiners) {
            
            creepNeeded = true;
            role = 'miner';
            creepMemory = minerMemory;

        }else if(haulers.length < desiredHaulers) {
            
            creepNeeded = true;
            role = 'hauler';
            creepMemory = haulerMemory;
                
        }else if(upgraders.length < desiredUpgraders) {
            
            creepNeeded = true;
            role = 'upgrader';
            creepMemory = upgraderMemory;
                
        } else if(constructionSites && builders.length < desiredBuilders){
            
            creepNeeded = true;
            role = 'builder';
            creepMemory = builderMemory;
            
        }
        

    //En caso de que sea necesario crear algún creep
        if(creepNeeded){
            
            let creepName = role.charAt(0).toUpperCase() + role.slice(1) + Game.time;
            let creepBody = commonTasks.defineCreepBody(thisRoom, role);
            createCreep.run(thisRoom, creepBody, creepName, creepMemory, null);
        }
        
    },
    
    setDesiredCreeps: function(thisRoom, minerContainers, constructionSites){

        let maxHarvesters = 3;
        //if(thisRoom.controller.level > 3){ maxHarvesters = 4; }

        //Builders
        if((constructionSites.length > 0 && thisRoom.controller.level < 4) || constructionSites.length > 5){
            thisRoom.memory.desiredBuilders = 1;
        }else{
            thisRoom.memory.desiredBuilders = 0;
        }
        //Haulers
        if(thisRoom.controller.level > 1 && minerContainers.length > 0){
            thisRoom.memory.desiredHaulers = 1;
        }
        //Miners
        thisRoom.memory.desiredMiners = minerContainers.length;
        //Harvesters
        let desiredHarvesters = maxHarvesters - thisRoom.memory.desiredMiners - thisRoom.memory.desiredHaulers;
        if(desiredHarvesters == 0) desiredHarvesters = 1;
        thisRoom.memory.desiredHarvesters = desiredHarvesters;
        //Upgraders
        if(thisRoom.controller.level > 6){
            thisRoom.memory.desiredUpgraders = 3;
        } else if(thisRoom.memory.desiredHarvesters == 1){
            thisRoom.memory.desiredUpgraders = 2;
        
        } else {
            thisRoom.memory.desiredUpgraders = 1;
        }
    }
};