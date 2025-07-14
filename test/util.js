import { getCommand } from '../src/util.js';

describe('util', function () {
  it('should return proper command string', function () {
    getCommand({
      weight: {
        1: 3,
        2: 5,
      },
    }).should.equal('-w1 3 -w2 5');
    getCommand({ quiet: true }).should.equal('-q 1');
    getCommand({ quiet: false }).should.equal('');
    getCommand({ probabilityEstimates: true }).should.equal('-b 1');
    getCommand({ probabilityEstimates: false }).should.equal('-b 0');
    getCommand({ type: 0 }).should.equal('-s 0');
    getCommand({ kernel: 2 }).should.equal('-t 2');
    getCommand({ degree: 2 }).should.equal('-d 2');
    getCommand({ cost: 0.01 }).should.equal('-c 0.01');
    getCommand({ coef0: 0 }).should.equal('-r 0');
    getCommand({ epsilon: 1 }).should.equal('-p 1');
    getCommand({ cacheSize: 300 }).should.equal('-m 300');
    getCommand({ shrinking: true }).should.equal('-h 1');
    getCommand({ shrinking: false }).should.equal('-h 0');
    getCommand({ nu: 0.5 }).should.equal('-n 0.5');
    getCommand({ tolerance: 0.001 }).should.equal('-e 0.001');
    getCommand({
      degree: 2,
      shrinking: true,
    }).should.equal('-d 2 -h 1');
  });

  it('should throw if bad option', function () {
    (function () {
      getCommand({ bad: true });
    }).should.throw(/Bad option/);
  });
});
