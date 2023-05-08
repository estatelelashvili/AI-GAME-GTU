import Agent from './bots/Agent.js';
import Hero from './bots/Hero.js';





const AgentTrainigData = {
    trainingData:[
        [0,0], // NOT isEnemy, NOT isAlive
        [0,1], // NOT isEnemy, isAlive
        [1,0], // isEnemy, NOT isAlive
        [1,1], // isEnemy, isAlive
],
    labels: [0, 0, 0, 1]
}

const HeroTrainigData = {
    trainingData:[
        [0,0], // NOT isEnemy, NOT isBulletNear -> call and go home
        [0,1], // NOT isEnemy, isBulletNear -> dodge bullet
        [1,0], // isEnemy, NOT isBulletNear -> call and go home
        [1,1], // isEnemy, isBulletNear -> dodge bullet
],
    labels: [0, 1, 0, 1]
}

function cb(){
    console.log('Bullet is close!')
};
class Game{
    constructor(AgentTrainigData, HeroTrainigData){

        this.btnRestart = document.getElementById('restart');
        this.hero = new Hero(HeroTrainigData, 
            '.neo-img',
             '.agent-container-img',
             '.neo-sensor',
             'system-enemy'
             );


        this.agent = new Agent(AgentTrainigData,
             '.agent-container-img', 
             ".neo-img", 
             ".agent-sensor",
             "system-agent", this.hero.action)
    }

    run(){
        this.agent.action('system-enemy');
        this.listenToRestart();
    }

    listenToRestart(){
        this.btnRestart.addEventListener('click', ()=>{
            location.reload();
        })
    }


}
const game = new Game(AgentTrainigData,HeroTrainigData );
game.run();