import Network from '../../network';

export default class Bot {
  constructor(dataset, imgQuery, EnemyImgQuery, sensorQuery, id) {
    this.isEnemyNearBy = false;
    this.isEnemyAlive = false;
    this.isAlive = true;
    this.isObjectEnemy = false;

    this.id = id;

    this.sensor = document.querySelector(sensorQuery);
    this.img = document.querySelector(imgQuery);
    this.enemyImg = document.querySelector(EnemyImgQuery);
    this.mainContainer = document.querySelector('.main-container');
    this.bullet = document.querySelector('.bullet');

    this.nn = new Network();
    this.nn.train(dataset);
  }

  detectEnemy(contactPoint1, contactPoint2) {
    if (contactPoint1 > contactPoint2) {
      return true;
    }
    return false;
  }
}
