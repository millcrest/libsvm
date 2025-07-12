const gamma = 0.2;
const cost = 1;

export default async function exec(SVM, time) {
  const data = await import('ml-dataset-iris');
  const MILISECONDS = time * 1000;

  const features = data.getNumbers();
  let labels = data.getClasses();
  const classes = data.getDistinctClasses();

  const c = {};
  classes.forEach((v, idx) => (c[v] = idx));
  labels = labels.map((l) => c[l]);

  const t1 = performance.now();
  let t2 = performance.now();
  let count = 0;
  while (t2 - t1 < MILISECONDS) {
    const svm = new SVM({
      quiet: true,
      cost: cost,
      gamma: gamma,
    });
    svm.crossValidation(features, labels, labels.length);
    count++;
    t2 = performance.now();
  }

  // console.log('accuracy: ', result.reduce((prev, current, idx) => current === labels[idx] ? prev + 1 : prev, 0)/ labels.length);
  return count;
}
