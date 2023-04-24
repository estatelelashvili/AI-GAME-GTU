import Bot from './Bot.js';

export default class Enemy extends Bot {
  constructor(dataset, imgQuery, EnemyImgQuery, sensorQuery, id, callBack) {
    super(dataset, imgQuery, EnemyImgQuery, sensorQuery, id);

    this.agentArm = document.querySelector('.img-arm');
    this.sensorRect = this.sensor.getBoundingClientRect();
    this.enemyRect = this.enemyImg.getBoundingClientRect();
    this.bulletRect = this.bullet.getBoundingClientRect();

    this.isBulletClose = false;
    this.callBack = callBack;
  }

  aim(id) {
    this.isEnemyNearBy = this.detectEnemy(this.sensorRect.right,this.enemyRect.left );
    this.isObjectEnemy = this.chechIfObjectIsEnemy(id);
    const decision = this.nn.predict([this.isEnemyNearBy,this.isObjectEnemy]);
    if(decision){
      this.agentArm.classList.add('aim');
      this.bullet.classList.add('load', 'lock');
    }
   
  }

  flyBullet() {
    let intervalID = setInterval(()=> {

      let currentLeft = parseFloat(this.bullet.offsetLeft);
      this.bullet.style.left = `${currentLeft + 100}px`;

      this.enemyRect = this.enemyImg.getBoundingClientRect();
      this.bulletRect = this.bullet.getBoundingClientRect();

      this.isBulletClose = this.enemyRect.left - this.bulletRect.right <= 175;
      if(this.isBulletClose){
        // console.log(this.callBack);
        this.callBack();

      }

      if(this.bullet.offsetLeft + this.bullet.offsetWidth >=
        this.mainContainer.offsetLeft + this.mainContainer.offsetWidth){
          clearInterval(intervalID);
          this.bullet.style.left = 
          this.mainContainer.offsetLeft +
          this.mainContainer.offsetWidth - 
          this.bullet.offsetWidth + 'px';
        }

    }, 500);
    if(this.bullet.offsetLeft  + this.bullet.offsetWidth === 
      this.mainContainer.offsetLeft + this.mainContainer.offsetWidth ){
        this.bullet.style.left = '225px';
      }
  }

  shoot(id) {
    this.isObjectEnemy = this.chechIfObjectIsEnemy(id);
    const decision = this.nn.predict([this.isObjectEnemy, this.isAlive]);
    if (decision) {
      this.flyBullet();
    }
  }

  chechIfObjectIsEnemy(id){
    return id === 'system-enemy';

  }

  action(id) {
    this.aim(id);
    this.shoot(id);
  }
}
