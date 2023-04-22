import Bot from 'Bot.js';

class Enemy extends Bot {
  constructor(dataset, imgQuery, EnemyImgQuery, sensorQuery, id, callBack) {
    super(dataset, imgQuery, EnemyImgQuery, sensorQuery, id);

    this.agentArm = document.querySelector('.img-arm');
  }

  aim() {
    this.detectEnemy();
    this.arm.classList.add('gun-pointed');
  }

  flyBullet() {}

  shoot() {
    const decision = this.nn.predict(this.isEnemy, this.isEnemyAlive);
    if (decision) {
      this.flyBullet();
    }
  }

  action() {}
}
