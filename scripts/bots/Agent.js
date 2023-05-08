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

    this.bulletCount = 7;
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
    return new Promise((resolve) =>{

      let intervalID = setInterval(()=> {
  
        let currentLeft = parseFloat(this.bullet.offsetLeft);
        this.bullet.style.left = `${currentLeft + 10}px`;
  
        this.enemyRect = this.enemyImg.getBoundingClientRect();
        this.bulletRect = this.bullet.getBoundingClientRect();
  
        this.isBulletClose = this.enemyRect.left - this.bulletRect.right <= 175;
        if(this.isBulletClose){
          // console.log(this.callBack);
          this.callBack(this.id, this.bulletCount >= 1);
  
        }
  
        if(this.bullet.offsetLeft + this.bullet.offsetWidth >=
          this.mainContainer.offsetLeft + this.mainContainer.offsetWidth){
            clearInterval(intervalID);
            this.bullet.style.left = 
            this.mainContainer.offsetLeft +
            this.mainContainer.offsetWidth - 
            this.bullet.offsetWidth + 'px';
            resolve();
          }
  
      }, 25);
      if(this.bullet.offsetLeft  + this.bullet.offsetWidth === 
        this.mainContainer.offsetLeft + this.mainContainer.offsetWidth ){
          this.bullet.style.left = '360px';
      }
    });
  }

  async shoot(status) {
    this.bullet.classList.remove('lock');
    // this.isObjectEnemy = this.chechIfObjectIsEnemy(id);
    this.isObjectEnemy = status;
    // const decision = this.nn.predict([this.isObjectEnemy, this.isAlive]);
    const decision = this.nn.predict([this.isEnemyNearBy, this.isAlive]);
    if (decision) {
      const fireNextBullet = async () => {
        if(this.bulletCount > 0){
          await this.flyBullet().then(()=> {
            this.bulletCount--;
            fireNextBullet();
          });

        if(this.bulletCount <= 0){
            this.callBack(this.id, this.bulletCount >= 1);
            return;
          }
        }
      };

      fireNextBullet();
    }
  }

  chechIfObjectIsEnemy(id){
    return id === 'system-enemy';
  }

  action =(id, status)=> {
    this.aim(id);
    setTimeout(()=> {
      this.shoot(status);
    }, 1000);
  }
}
