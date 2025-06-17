// execute task in parallel
const asyncTask = function (i) {
  return new Promise((resolve, reject) => {
    console.log("start", i);
    setTimeout(() => resolve(`Completing ${i}`), 100 * i);
  });
};

const tasks = [
  () => asyncTask(3),
  () => asyncTask(1),
  () => asyncTask(7),
  () => asyncTask(2),
  () => asyncTask(5),
];

const parallelTask = () => {
  const promises = tasks.map((task) => task());

  // wait for all task to be finished

  const allSettled = Promise.allSettled(promises);

  allSettled
    .then((d) => {
      console.log(d);
    })
    .catch((r) => {
      console.log(r);
    });
};

parallelTask();
