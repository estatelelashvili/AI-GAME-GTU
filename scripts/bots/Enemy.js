import Bot from 'Bot.js';

class Enemy extends Bot{
    constructor(id, imgClass, sensorClass){
        super(id, imgClass, sensorClass);
    }

    action(){
        
    }

    aim(){
        this.detect();
        
    }

    shoot(){

    }
}