require('./lib/brain.js');
const { debug } = require('./logger.cjs');

debug(brain);

// provide optional config object, defaults shown.
const config = {
  inputSize: 20,
  inputRange: 20,
  hiddenLayers: [20, 20],
  outputSize: 20,
  learningRate: 0.01,
  decayRate: 0.999
};

// create a simple recurrent neural network
const net = new brain.recurrent.RNN(config);

net.train([
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] }
]);

let output = net.run([0, 0]); // [0]
output = net.run([0, 1]); // [1]
output = net.run([1, 0]); // [1]
output = net.run([1, 1]);
