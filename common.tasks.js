
module.exports = {
    
    harvest: function(creep) {
        
        if(creep.memory.source && creep.memory.source != null){

            let thisSource = Game.getObjectById(creep.memory.source);
            
            let result = creep.harvest(thisSource);
            //console.log(creep.name + ":" + result);
            
            if(result == ERR_NOT_IN_RANGE) {
                creep.moveTo(thisSource, {visualizePathStyle: {stroke: '#1111ff'}});
            }else if(result == ERR_NOT_ENOUGH_RESOURCES){
                delete creep.memory.source;
            }

        }else{
            let thisSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(thisSource != null){
                creep.memory.source = thisSource.id;
                if(creep.harvest(thisSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(thisSource, {visualizePathStyle: {stroke: '#1111ff'}});
                }
            }else{
                creep.memory.source = null;
            }
            
        }
        
        if(Game.time % 50 == 0){
            creep.memory.source = null;
        }
    },
    
    collect: function(creep, roomContainers, otherContainers, minerContainers) {
        
        if(!creep.memory.myContainer){
            
            let containers = [];
            
            //console.log(minerContainers.length);
            //console.log(roomContainers.length);
            
            if(creep.memory.role == "hauler"){
                containers = minerContainers;
            }else{
                containers = roomContainers;
            }
            
            containers = containers.filter(c => c.store.energy > creep.carryCapacity - creep.store.energy);
            
            if(containers.length > 0){
                
                containers = _.sortBy(containers, c => creep.pos.getRangeTo(c));
                let container = containers[0];
                
                if(container != null) creep.memory.myContainer = container.id;
            }else{
                this.harvest(creep);
            }
        }
        
        if(creep.memory.myContainer){
            
            var container = Game.getObjectById(creep.memory.myContainer);            
            
            if(container.store.energy > creep.carryCapacity - creep.store.energy){
                if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#1111ff'}});
                }
                return true;
            }else{
                delete creep.memory.myContainer;
                return false;
            }
        }
        return false;
    },
    
    getConstructionSite: function(creep){
        
        let constructionSites = [];
        let constructionSitesIds = thisRoom.memory.constructionSites;

        _.forEach(constructionSitesIds, id => {

            let cs = Game.getObjectById(id);
            if(cs){
                constructionSites.push(cs);
            }
        });
        
        var roads = _.filter(constructionSites, {structureType : STRUCTURE_ROAD});
        var rest = constructionSites.filter(d => !(d.structureType == STRUCTURE_ROAD));
        
        if(creep.memory.role == 'harvester'){
            if(roads.length > 0){
                site = roads[0];
            }else{
                site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            }
            if(site != null){
                creep.memory.site = site.id;   
            }
        }else{
            site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(site != null){
                creep.memory.site = site.id;   
            }
        }
        
        return site;
    },
    
    pickAround: function(creep, droppedResources){
        if (creep.store.energy < creep.carryCapacity){
            
            if (droppedResources.length > 0) {
                if(creep.pickup(droppedResources[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(droppedResources[0]);
                }
            }
        }
    },

    pickInRoom: function(creep, minAmount){
        let droppedResources = [];
        if(!minAmount) minAmount = 50;

        for(i in creep.memory.droppedResources){

            let resource = Game.getObjectById(creep.memory.droppedResources[i]);

            if(resource){
                droppedResources.push(resource);
            }
        }

        if(droppedResources.length > 0){      
            droppedResources = _.filter(droppedResources, function(dr) {
                return (dr.amount >= minAmount);
            });
            droppedResources = _.sortBy(droppedResources, dr => creep.pos.getRangeTo(dr));
            return droppedResources[0];
        }else{
            return null;
        }
    },
    
    unloadOtherResource: function(creep){
        
    },
    
    defineCreepBody: function(thisRoom, role){
        let initialBody = [];
        let basicBody = [];
        let curBody = [];
        let maxBodyParts = 21;
        let curBodyParts = 0;
        let maxCost = thisRoom.energyCapacityAvailable;
        let available = thisRoom.energyAvailable;
        if(maxCost < 300 || available < 301){
            maxCost = 300;
        }


        //console.log(thisRoom.name + ': ' + available + '/' + maxCost);
        switch(role){
            
            case 'harvester':
            {
                if(available < maxCost){
                    maxCost = available;
                }
                initialBody = [MOVE, CARRY, WORK];
                basicBody = [MOVE, CARRY, WORK];
            }break;
            case 'hauler':
            {
                maxBodyParts = 24;
                initialBody = [MOVE, CARRY];
                basicBody = [MOVE, CARRY];
            }break;
            case 'miner':
            {
                maxBodyParts = 6;
                initialBody = [];
                basicBody = [MOVE,WORK];
            }break;
            case 'upgrader':
            {
                initialBody = [MOVE, CARRY, WORK];
                basicBody = [MOVE, CARRY, WORK];
            }break;
            case 'builder':
            {
                initialBody = [MOVE, CARRY, WORK];
                basicBody = [MOVE, CARRY, WORK];
            }break;
            case 'flagHarvester':
            {
                maxBodyParts = 30;
                initialBody = [MOVE, CARRY, WORK];
                basicBody = [MOVE, CARRY, WORK];
            }break;
            case 'flagReserver':
            {
                maxBodyParts = 4;
                initialBody = [MOVE, CLAIM, MOVE, CLAIM];
                basicBody = [];
            }break;
            case 'flagBuilder':
            {
                maxBodyParts = 30;
                initialBody = [MOVE, CARRY, WORK];
                basicBody = [MOVE, CARRY, WORK];
            }break;
            case 'flagDefender':
            {
                maxBodyParts = 4;
                initialBody = [];
                basicBody = [MOVE, RANGED_ATTACK];
            }break;
            case 'flagClaimer':
            {
                maxBodyParts = 2;
                initialBody = [];
                basicBody = [MOVE, CLAIM];
            }break;
        }
        
        
        curBody = initialBody;
        curBodyParts = curBody.length;
        let curCost = 0;
        for(let part in curBody){
            curCost += BODYPART_COST[curBody[part]];
        }
        
        //console.log("curBody: " + curBody + " - curBodyParts: " + curBodyParts + " - curCost: " + curCost);
        
        let i = 0;
        
        while(curBodyParts < maxBodyParts && curCost < maxCost){

            curCost = curCost + BODYPART_COST[basicBody[i]];
            if(curCost > maxCost){
                break;
            }
            curBody.push(basicBody[i]);
            curBodyParts ++;
            
            i++;
            if(i == basicBody.length){
                i = 0;
            }
        }
        
        return curBody;
    },

    doWhileMoving: function(creep){

        let toPick = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
        let toBuild = creep.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 3);
        let structures = creep.pos.findInRange(FIND_STRUCTURES, 3);
        let toRepair = _.filter(structures, function(s) {
            return (s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART);
        });
        
        if(toPick.length > 0){
            creep.pickup(toPick[0]);
        }

        if(toRepair.length > 0){
            creep.repair(toRepair[0]);
        }

        if(toBuild.length > 0){
            creep.build(toBuild[0]);
        }
    },

    distanceSq: function(from,to) {
    
        var xDif = from.pos.x - to.pos.x;
        var yDif = from.pos.y - to.pos.y;
        var dist = Math.sqrt(xDif*xDif + yDif*yDif);   
        return dist;
    
    }
    
};