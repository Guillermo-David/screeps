module.exports = {

    run: function(thisRoom){
        if(thisRoom.memory.linksFrom && thisRoom.memory.linkTo){

            let linksFrom = thisRoom.memory.linksFrom;
            let linkTo = Game.getObjectById(thisRoom.memory.linkTo);
            
            for(i in linksFrom){
                let linkFrom = Game.getObjectById(linksFrom[i]);
                if(linkFrom && linkFrom.store.energy > linkFrom.energyCapacity * 0.9 && linkTo.store.energy == 0){
                    linkFrom.transferEnergy(linkTo);
                }
            }
        }
    }
};