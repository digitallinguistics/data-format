/**
 * A utility for running/iterating through a generator function
 * @param  {Function} generator     The generator function to run
 * @param  {Array} generatorArgs    An array of arguments to pass to the generator function
 * @return {Promise} Resolves to the final value in the iterator
 */
const runGenerator = (generator, generatorArgs) => new Promise(resolve => {
  const args = Array.isArray(generatorArgs) ? generatorArgs : [generatorArgs];
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
