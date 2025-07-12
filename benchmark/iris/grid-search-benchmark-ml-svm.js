import SVM from 'ml-svm';
import data from 'ml-dataset-iris';
import { gamma, cost } from './util.js';

export default function exec(time) {
  const MILISECONDS = time * 1000;

  const features = data.getNumbers();
  let labels = data.getClasses();
  const classes = data.getDistinctClasses();

  const c = {};
  classes.forEach((v, idx) => (c[v] = idx));
  labels = labels.map((l) => c[l]);

  const startTime = Date.now();
  let endTime = Date.now();
  let count = 0;
  while (endTime - startTime < MILISECONDS) {
    for (let c of cost) {
      for (let g of gamma) {
        const svm = new SVM({
          C: c,
          kernel: 'rbf',
          kernelOptions: {
            sigma: g,
          },
          tolerance: 0.001,
          maxPasses: 1,
          maxIterations: 10000,
        });
        svm.train(features, labels);
      }
    }
    count++;
    endTime = Date.now();
  }

  return count;
}

const count = exec(5);
console.log('#iterations: ', count);
