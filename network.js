class Node{
    constructor(connections){
        this.weights= [];
        this.error = 0;
        this.output = 1; // bias

        for (let i = 0; i < connections; i++) {
            this.weights.push(Math.random() * 2 - 1);
        }
    }
}

class Layer{
    constructor(nodeCount, weightCount){
        this.nodes = [];

        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push(new Node(weightCount));
        }
    }
}

class Network{
    constructor(){
        this.learningRate = 0.1;
        this.epochs = 10000;

        this.inputLayer = new Layer(2, 0);
        this.hiddenLayer = new Layer(5, 2);
        this.outputLayer = new Layer(1, 5);
    }

    sigmoid(x){
        return 1 / (1 + Math.exp(-x));
    }

    dsigmoid(x){
        return x * (1 - x);
    }

    feedForward(data){
        for (let i = 0; i < this.inputLayer.nodes.length; i++) {
            this.inputLayer.nodes[i].output = data[i];
            // console.log('is it ok?: ',this.inputLayer.nodes[i].output);
        }

        for (let i = 0; i < this.hiddenLayer.nodes.length; i++) {
            let total = 0;
            for (let j = 0; j < this.inputLayer.length; j++) {
                total += parseFloat(this.inputLayer.nodes[j].output * 
                    this.hiddenLayer.nodes[i].weights[j]);
            }

        this.hiddenLayer.nodes[i].output = this.sigmoid(total);
        //  console.log(`hiddenLayer output: ${this.hiddenLayer.nodes[i].output}`);   
        } 

        for (let i = 0; i < this.outputLayer.nodes.length; i++) {
            let total = 0;
            for (let j = 0; j < this.hiddenLayer.nodes.length; j++) {
                total += parseFloat(this.hiddenLayer.nodes[j].output * 
                    this.outputLayer.nodes[i].weights[j]);  
            }
        
            this.outputLayer.nodes[i].output = this.sigmoid(total);  
        }
    }

    backPropagation(label){
        this.outputLayer.nodes[0].error = label - this.outputLayer.nodes[0].output;

        for (let i = 0; i < this.hiddenLayer.nodes.length; i++) {
            let  toatl = 0;
            
        }
    }




}


// XOR 
const dataSet = {
    trainingData: [[0, 0], [0, 1], [1, 0], [1, 1]],
    labels: [0, 1, 1, 0]
}

const nn = new Network();

nn.feedForward(dataSet.trainingData[1]);