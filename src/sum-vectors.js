import {
  AsyncArray,
  add,
  subtract,
  equal,
} from './async-array';

const p = (fn, ...args) => new Promise(((resolve) => fn(...args, resolve)));

export default async (v1, v2, cb) => {
  const recursiveWalkAndSum = async (vec1, vec2, acc, index) => {
    const arrayLength = await p(v1.length);
    const lengthEqualZero = await p(equal, arrayLength, 0);

    if (lengthEqualZero) {
      return cb(acc);
    }

    const lastElement1 = await p(vec1.pop);
    const lastElement2 = await p(vec2.pop);
    const sumOfElements = await p(add, lastElement1, lastElement2);

    const setIndex = await p(subtract, arrayLength, 1);
    const nextIndex = await p(add, index, 1);

    await p(acc.set, setIndex, sumOfElements);

    return recursiveWalkAndSum(vec1, vec2, acc, nextIndex);
  };

  const arrayLength1 = await p(v1.length);
  const arrayLength2 = await p(v2.length);
  const lengthEquality = await p(equal, arrayLength1, arrayLength2);

  if (lengthEquality) {
    const lastOfFirst = await p(v1.get, await p(subtract, arrayLength1, 1));
    const firstOfSecond = await p(v2.get, 0);
    const areVectorsInTouch = await p(equal, lastOfFirst, firstOfSecond);

    if (areVectorsInTouch) {
      return recursiveWalkAndSum(v1, v2, new AsyncArray([]), 0);
    }

    throw new Error('Векторы не соприкасаются');
  }

  throw new Error('Векторы несоразмерны');
};
