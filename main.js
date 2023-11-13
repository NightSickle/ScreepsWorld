// require('creeps.spawn');

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMainHarvester = require('role.mainHarvester');

module.exports.loop = function () {
    var Spawn1 = Game.spawns['Spawn1'];
    
    // 清除記憶體
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // end 清除記憶體

    // 自動生成
    // 設定生成數量
    var harvesterCount = 2;
    var upgraderCount = 2;
    var builderCount = 3;
    var MainharvesterCount = 1;

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    //console.log('Harvesters: ' + harvesters.length);

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    //console.log('Upgraders: ' + upgraders.length);
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //console.log('Builders: ' + builders.length);

    // console.log(Spawn1.room.energyAvailable);
    // _.filter()
    // && Spawn1.room.energyAvailable >= 300
    var newName;
    var type;
    if(!Spawn1.spawning)
    {
        if(harvesters.length < harvesterCount) {
            newName = 'Harvester' + Game.time;
            type = 'harvester';
            if(Spawn1.spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName, {memory: {role: type}}) != -6){
                console.log('Spawning new ' + type + ': ' + newName);
            }
        }
        else if(upgraders.length < upgraderCount) {
            newName = 'Upgrader' + Game.time;
            type = 'upgrader';
            if(Spawn1.spawnCreep([WORK,WORK,CARRY,MOVE], newName, {memory: {role: type}}) != -6){
                console.log('Spawning new ' + type + ': ' + newName);
            }
        }
        else if(builders.length < builderCount){
            newName = 'Builder' + Game.time;
            type = 'builder'; 
            if(Spawn1.spawnCreep([WORK,WORK,CARRY,MOVE], newName,{memory: {role: type}}) != -6){
                console.log('Spawning new ' + type + ': ' + newName);
            }
        }
    }
    // end 自動生成

    // 主堡生成時顯示
    
    if(Spawn1.spawning) { 
        var spawningCreep = Game.creeps[Spawn1.spawning.name];
        Spawn1.room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Spawn1.pos.x + 1, 
            Spawn1.pos.y, 
            {align: 'left', opacity: 0.8});
    }

    // end 主堡生成時顯示

    // Role Play

    // console.log('----Creeps---');
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        // console.log(name);
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            // roleMainHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder'){
            roleBuilder.run(creep);
        }
    }

    // console.log(Game.cpu.bucket);
    if(Game.cpu.bucket == 10000){
        console.log('Generate Pixel...')
        Game.cpu.generatePixel();
    }
    // end Role Play
}