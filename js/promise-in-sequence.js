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

/****
 * here we have array of callback which are promises
 *
 * we do not have array of promises
 *
 * **/

const result = [];
const asyncSeriesExecuterReduce = () => {
  return tasks.reduce((all, promiseCall) => {
    return all.then((d) => {
      // first previous promise get resolved then next one
      // return promiseCall.then((r) => result.push(r));
      return promiseCall().then((r) => result.push(r));
    });
  }, Promise.resolve());
};

// const d = asyncSeriesExecuterReduce(tasks);
// console.log("]]]", d);

// d.then((d) => {
//   console.log("=-=", d);
// });

const res = [];
async function asyncSeriesExecuterLoop() {
  // for (const promiseCall of tasks) {
  //   const r = await promiseCall();
  //   res.push(r);
  // }
  // for (let i = 0; i < tasks.length; i++) {
  //   const promiseCall = tasks[i];
  //   const r = await promiseCall();
  //   res.push(r);
  // }
  /****
   *
   * Below approaches wont work
   *
   * **/
  // tasks.forEach(async (promiseCall) => {
  //   const r = await promiseCall();
  //   console.log("=");
  //   res.push(r);
  // });
  // const rr = tasks.map(async (promiseCall) => {
  //   const r = await promiseCall();
  //   console.log("=");
  //   res.push(r);
  // });
  // console.log("------->", rr, res);
}

asyncSeriesExecuterLoop();
console.log(res);
