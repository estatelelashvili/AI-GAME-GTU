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
        [0,0], // NOT isNear, NOT isBulletNear -> call and go home
        [0,1], // NOT isNear, isBulletNear -> dodge bullet
        [1,0], // isNear, NOT isBulletNear -> call and go home
        [1,1], // isNear, isBulletNear -> dodge bullet
],
    labels: [0, 1, 0, 1]
}