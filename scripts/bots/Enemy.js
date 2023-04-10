import Bot from 'Bot.js';

class Enemy extends Bot{
    constructor(id, imgClass, enemyClass, sensorClass, dataSet){
        super(id, imgClass, enemyClass, sensorClass, dataSet);

        this.arm = document.querySelector('.arm');
    }

    action(){
        
    }

    aim(){
        this.detect();
        this.arm.classList.add('gun-pointed');
    }

    flyBullet(){

    }

    shoot(){
        const decision = this.nn.predict(this.isEnemy, this.isEnemyAlive);
        if(decision){
            this.flyBullet();
        }
    }
}