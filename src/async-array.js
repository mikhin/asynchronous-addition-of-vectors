export const wrap = (fn, cb) => {
  setTimeout(() => {
    cb(fn());
  }, Math.random() * 20);
};

export const AsyncArray = function (initial) {
  if (initial && !(initial instanceof Array)) {
    throw new Error('initial value is not an array');
  }

  const a = initial ? Array.from(initial) : [];

  this.set = (index, value, cb) => wrap(() => {
    a[index] = value;
  }, cb);

  this.push = (value, cb) => wrap(() => {
    a.push(value);
  }, cb);

  this.get = (index, cb) => wrap(() => a[index], cb);
  this.pop = (cb) => wrap(() => a.pop(), cb);
  this.length = (cb) => wrap(() => a.length, cb);
  this.getArrayForTests = () => a;

  this.print = () => {
    console.log(a.toString());
  };
};

export const add = (a, b, cb) => wrap(() => a + b, cb);
export const subtract = (a, b, cb) => wrap(() => a - b, cb);
export const equal = (a, b, cb) => wrap(() => a === b, cb);
