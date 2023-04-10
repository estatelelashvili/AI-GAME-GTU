class Node {
  constructor(connections) {
    this.weights = [];
    this.error = 0;
    this.output = 1; // bias included

    for (let i = 0; i < connections; i++) {
      this.weights.push(Math.random() * 2 - 1);
    }
  }
}

class Layer {
  constructor(nodeCount, totalWeights) {
    this.nodes = [];
    for (let j = 0; j < nodeCount; j++) {
      this.nodes.push(new Node(totalWeights));
    }
  }
}

export default class Network {
  constructor() {
    this.learningRate = 0.1;
    this.epochs = 10000;
    this.inputLayer = new Layer(2, 0);
    this.hiddenLayer = new Layer(5, 2);
    this.outputLayer = new Layer(1, 5);
  }

  sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  dsigmoid(x) {
    return x * (1 - x);
  }

  feedForward(value1, value2) {
    this.inputLayer.nodes[0].output = value1;
    this.inputLayer.nodes[1].output = value2;

    for (let i = 0; i < this.hiddenLayer.nodes.length; i++) {
      let total = 0;
      for (let j = 0; j < this.inputLayer.nodes.length; j++) {
        total += parseFloat(
          this.inputLayer.nodes[j].output * this.hiddenLayer.nodes[i].weights[j]
        );
      }
      this.hiddenLayer.nodes[i].output = this.sigmoid(total);
    }

    for (let i = 0; i < this.outputLayer.nodes.length; i++) {
      let total = 0;
      for (let j = 0; j < this.hiddenLayer.nodes.length; j++) {
        total += parseFloat(
          this.hiddenLayer.nodes[j].output *
            this.outputLayer.nodes[i].weights[j]
        );
      }
      this.outputLayer.nodes[i].output = this.sigmoid(total);
    }
  }

  backPropagation(expectedValue) {
    for (let i = 0; i < this.outputLayer.nodes.length; i++) {
      this.outputLayer.nodes[i].error =
        expectedValue - this.outputLayer.nodes[i].output;
    }

    for (let i = 0; i < this.hiddenLayer.nodes.length; i++) {
      let total = 0;
      for (let j = 0; j < this.outputLayer.nodes.length; j++) {
        total += parseFloat(
          this.outputLayer.nodes[j].error * this.outputLayer.nodes[j].weights[i]
        );
      }
      this.hiddenLayer.nodes[i].error = total;
    }

    for (let i = 0; i < this.hiddenLayer.nodes.length; i++) {
      for (let j = 0; j < this.inputLayer.nodes.length; j++) {
        this.hiddenLayer.nodes[i].weights[j] += parseFloat(
          this.learningRate *
            this.hiddenLayer.nodes[i].error *
            this.inputLayer.nodes[j].output *
            this.dsigmoid(this.hiddenLayer.nodes[i].output)
        );
      }
    }
    for (let i = 0; i < this.outputLayer.nodes.length; i++) {
      for (let j = 0; j < this.hiddenLayer.nodes.length; j++) {
        this.outputLayer.nodes[i].weights[j] += parseFloat(
          this.learningRate *
            this.outputLayer.nodes[i].error *
            this.hiddenLayer.nodes[j].output *
            this.dsigmoid(this.outputLayer.nodes[i].output)
        );
      }
    }
  }

  train(trainSet) {
    for (let i = 0; i < this.epochs; i++) {
      for (let j = 0; j < trainSet.trainingData.length; j++) {
        this.feedForward(
          trainSet.trainingData[j][0],
          trainSet.trainingData[j][1]
        );
        this.backPropagation(trainSet.labels[j]);
      }
    }
  }

  predict(testData) {
    this.feedForward(testData[0], testData[1]);
    const result = this.outputLayer.nodes[0].output;
    // console.log('decimal values ', testData[0], testData[1], result);
    return +result.toFixed(1) == true;
  }
}

// XOR DATA

// const dataSet = {
//   trainingData: [
//     [1, 1],
//     [1, 0],
//     [0, 0],
//     [0, 1],
//   ],
//   labels: [0, 1, 0, 1],
// };

// const nn = new Network();

// nn.train(dataSet);

// for (let i = 0; i < dataSet.trainingData.length; i++) {
//   const testResult = nn.predict(dataSet.trainingData[i]);
//   console.log('boolean values ', testResult);
// }
