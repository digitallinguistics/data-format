const runGenerator = (generator, generatorArgs) => new Promise(resolve => {
  const args = Array.isArray(generatorArgs) ? generatorArgs : Array.from(generatorArgs);
  const iterator = generator(...args);
  let result;

  (function iterate(val) {

    try {
      result = iterator.next(val);
    } catch (err) {
      iterator.throw(err);
    }

    if (result.done) {
      resolve(result.value);
    } else if (result.value instanceof Promise) {
      result.value.then(iterate).catch(err => iterator.throw(err));
    } else {
      setTimeout(() => { iterate(result.value); }, 0);
    }

  }());
});

module.exports = runGenerator;
