export default class Bot{
    constructor(id, imgClass,enemyClass, sensorClass){

        this.id = id;
        this.isAlive = true;
        this.isEnemyNear = false;

        this.mainContainer = document.querySelector('.main-container');
        this.img = document.querySelector(imgClass);
        this.enemy = document.querySelector(enemyClass);
        this.sensor = document.querySelector(sensorClass);

        this.imgRect = this.img.getBoundingRectangle();
        this.sensorRect = this.img.getBoundingRectangle();


    }

    detect(contactPoint1, contactPoint2) {
        if(contactPoint1 > contactPoint2){
            this.isEnemyNear = true;
        }
    }
}