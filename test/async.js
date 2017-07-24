module.exports = asyncFunc => done => asyncFunc().then(done).catch(done.fail);
