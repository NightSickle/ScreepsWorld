var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

		// 改變狀態
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }
		// end 改變狀態

		// 處理工作
	    if(creep.memory.building) {
			// 建造模式
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
			// 採集模式
	        var sources = creep.room.find(FIND_SOURCES);
			if(sources.length >= 1)
			{
				if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
				}
            }
			else
			{
				if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
				}
			}
	    }
		// end 處理工作

		// 調查creep的疲勞值
        // console.log(creep.fatigue);
	}
};

module.exports = roleBuilder;