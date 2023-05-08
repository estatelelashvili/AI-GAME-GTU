import Bot from './Bot.js';

export default class Hero extends Bot{
    constructor(dataset, imgQuery, EnemyImgQuery, sensorQuery, id) {
        super(dataset, imgQuery, EnemyImgQuery, sensorQuery, id);
        this.phone = document.querySelector('.phone');
    }

    checkIfObjectIsEnemy(id){
        return id === 'system-agent';
    }

    lean(){
        this.img.classList.add('bowed');
        setTimeout(()=>{
            this.img.classList.remove('bowed');
        }, 1100)
    }

    fade(){
        setTimeout(()=>{
            this.phone.classList.add('call');
            this.img.classList.add('faded');
        }, 1000);
        setTimeout(()=>{
            this.phone.classList.add('dropped');
        }, 3000);
    }

    action = (target_id, bulletCount) =>{
        this.isObjectEnemy = this.checkIfObjectIsEnemy(target_id);
        console.log('Is That enemy?', this.isObjectEnemy);
        console.log('Are any bullets lefts?', bulletCount);
        const decision = this.nn.predict([this.isObjectEnemy, bulletCount]);
        console.log('What is Heros decision?', decision);
        if(decision){
            this.sensor.classList.add('faded');
            this.lean();
        }else{
            this.fade();
        }
    }
}