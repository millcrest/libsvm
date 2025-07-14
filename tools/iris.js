import fs from 'node:fs';
import path from 'node:path';
import data from 'ml-dataset-iris';

const dataset = data.getDataset();
const distinctClasses = data.getDistinctClasses();
dataset.forEach((d) => {
  d[4] = distinctClasses.indexOf(d[4]);
});
const str = dataset.map((d) => d.join(' ')).join('\n');
fs.writeFileSync(
  path.resolve(import.meta.dirname, '../benchmark/iris/data.txt'),
  str,
);
