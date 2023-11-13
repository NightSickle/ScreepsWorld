var MainHarvester = {
    run: function(creep)
    {
        var sources = creep.room.find(FIND_SOURCES);
        this.harvest(creep);
    },

    harvest: function(creep,sources){
        console.log(creep.name);
    },
}

module.exports = MainHarvester;