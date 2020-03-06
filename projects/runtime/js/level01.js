var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 300, "y": groundY - 105 },
                { "type": "sawblade", "x": 1100, "y": groundY - 99},
                { "type": "sawblade", "x": 1300, "y": groundY - 99},
                { "type": "sawblade", "x": 1900,"y" : groundY - 105},
                { "type": "fire", "x": 500, "y": groundY - 10},
                { "type": "fire", "x": 1500, "y": groundY - 10},
                { "type": "fire", "x": 100000, "y": groundY - 10}
            ]
            
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
        
        function createSawBlade(x, y){
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);
            sawBladeHitZone.velocityX = -2; 
            sawBladeHitZone.rotationalVelocity = 8;
            
            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        
         for (var i = 0; i <= levelData.gameItems.length - 1; i++) {
                var gameItem = levelData.gameItems[i];
            if (gameItem.type === 'sawblade'){
                createSawBlade(gameItem.x, gameItem.y);
                }
            
            if (gameItem.type === 'fire'){
                createFire(gameItem.x, gameItem.y);
            }
           
        }
        


         function createFire(x,y) {
              var hitZoneSize = 25;
              var damageFromObstacle = 10;
              var fireHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
              fireHitZone.x = x;
              fireHitZone.y = y;
            
             game.addGameItem(fireHitZone);
            
             var obstacleImage = draw.bitmap('img/fire.png');
             fireHitZone.addChild(obstacleImage);
             obstacleImage.x = -50;
             obstacleImage.y = -65;
             obstacleImage.scaleX = .4;
             obstacleImage.scaleY = .4;
             
             
         }
    function createEnemy(x, y){
         var enemy =  game.createGameItem('enemy',25);
         var redSquare = draw.rect(50,50,'red');
         redSquare.x = -25;
         redSquare.y = -25;
         enemy.addChild(redSquare);
         
         enemy.x = 400;
         enemy.y = groundY-50;
         
         game.addGameItem(enemy);
         
         enemy.velocityX = -1;
         
         enemy.onPlayerCollision = function(){
             game.changeIntegrity(-30);
             enemy.fadeOut();
         };
         
         
         enemy.onPlayerCollision = function(){
             game.increaseScore(50);
             enemy.fadeOut();
         };
                 
    }
    
        // DO NOT EDIT CODE BELOW HERE
     };

};
// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
