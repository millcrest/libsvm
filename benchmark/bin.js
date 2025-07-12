#!/usr/bin/env node

import Table from 'cli-table';
import { spawn } from 'node:child_process';
import { loadSVM } from '../wasm.js';

const argv = process.argv.slice(2);
let benchmarks = argv[0];
let modes = argv[1];
if (benchmarks === 'all' || !benchmarks) {
  benchmarks = [
    'iris/cross-validation',
    'iris/grid-search',
    'iris/precomputed-cv',
  ];
} else {
  benchmarks = benchmarks.split(',');
}
if (modes === 'all' || !modes) {
  modes = ['native', 'wasm'];
} else {
  modes = modes.split(',');
}

const time = +argv[2] || 5;

if (modes.includes('wasm')) {
  console.log('Running benchmark on nodejs version', process.version, '\n');
}

const table = new Table({
  head: [`Benchmark: # iterations in ${time} seconds`].concat(modes),
});

function toPercent(n, max) {
  const perc = (n / max) * 100;
  return '' + n + ' (' + perc.toFixed(1) + '%)';
}

async function exec() {
  for (let benchmark of benchmarks) {
    let counts = [];
    for (let mode of modes) {
      counts.push(await run(mode, time, benchmark)); //eslint-disable-line no-await-in-loop
      console.log('\n');
    }
    const max = Math.max.apply(
      null,
      counts.filter((c) => typeof c === 'number'),
    );
    counts = counts.map((c) => (typeof c === 'number' ? toPercent(c, max) : c));
    table.push([benchmark, ...counts]);
  }
  console.log(table.toString());
}

async function run(mode, time, benchmark) {
  let count = 0;
  console.log(mode, benchmark);
  const runBenchmark = (await import(`./${benchmark}-benchmark.js`)).default;
  let SVM;
  if (mode === 'wasm') {
    try {
      SVM = await loadSVM();
    } catch (e) {
      console.log(e.message);
      return 'error';
    }
  } else if (mode === 'native') {
    let str = '';
    const prom = new Promise((resolve, reject) => {
      const [dir, exec] = benchmark.split('/');
      const cmd = `${import.meta.dirname}/${dir}/bin/${exec}`;
      const args = [];
      if (benchmark === 'iris/precomputed-cv') {
        args.push(
          `${import.meta.dirname}/${dir}/data-kernel-rbf-gamma-2e-1.txt`,
        );
      } else {
        args.push(`${import.meta.dirname}/${dir}/data.txt`);
      }
      args.push(time);
      console.log(cmd);
      const child = spawn(cmd, args);
      child.on('close', function () {
        resolve();
      });
      child.on('error', function () {
        reject(new Error(`Could not execute ${cmd} ${args}`));
      });
      child.stdout.on('data', (data) => {
        str += data;
      });
      child.stdout.pipe(process.stdout);
    });

    try {
      await prom;
      count = +/(\d+) iteration/.exec(str)[1];
    } catch (e) {
      console.error('error executing benchmark', e, e.message);
      return e.message;
    }
    return count;
  } else {
    console.log(`Unknown mode ${mode}`);
    return 0;
  }

  try {
    count = runBenchmark(SVM, time);
  } catch (e) {
    console.error('error executing benchmark', e.message);
    return e.message;
  }
  console.log(`Done. ${count} iterations in ${time} seconds.`);
  return count;
}

exec();
