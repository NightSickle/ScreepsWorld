var spawnCreeps = {

    /*  部件 成本 功能
        MOVE 50 移動
        WORK 100 工作
        CARRY 50 攜帶(50)
        ATTACK 80 攻擊(30)
        RANGED_ATTACK 150 遠程攻擊(10/aoe 1-4-10)
        HEAL 250 治療(12/4)
        CLAIM 600 佔領
        TOUGH 10 裝甲
    */

    spawn: function(energy,type) {
        /* 
            energy Tier
            300 1
            350 2
            400 3
            450 4
            500 5
            550 6
        */
        /*
            harvester
            [WORK,CARRY,CARRY,MOVE,MOVE] 300
            [WORK,WORK,CARRY,CARRY,MOVE,MOVE] 400
            [WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE] 500
        */
        /*
            upgrader & builder

        */


        var energyTier = energy / 50 - 5; 
        var Spawn1 = Game.spawns['Spawn1'];
        var newName = type + Game.time;
        var body = [];
        Spawn1.spawnCreep(body,newName,{memory: {role : type}});
	}
};

module.exports = spawnCreeps;