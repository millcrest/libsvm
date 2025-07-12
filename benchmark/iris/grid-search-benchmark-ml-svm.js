import SVM from 'ml-svm';
import { gamma, cost } from './util.js';

export default async function exec(time) {
  const data = await import('ml-dataset-iris');
  const MILISECONDS = time * 1000;

  const features = data.getNumbers();
  let labels = data.getClasses();
  const classes = data.getDistinctClasses();

  const c = {};
  classes.forEach((v, idx) => (c[v] = idx));
  labels = labels.map((l) => c[l]);

  const startTime = performance.now();
  let endTime = performance.now();
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
    endTime = performance.now();
  }

  return count;
}

const count = exec(5);
console.log('#iterations: ', count);
