const CancelablePromise = (executer) => {
  let cancel = null;
  const p = new Promise((res, rej) => {
    executer(res, rej);
    cancel = () => rej(new Error("cancel"));
  });

  return {
    promise: p,
    cancel: () => {
      console.log("promise cancel");
      if (cancel) cancel?.();
    },
  };
};

const c = CancelablePromise((res, rej) => {
  setTimeout(() => {
    res("resolved"); // yaha to resolve karna padega
  }, 2000);
});

c.promise
  .then((c) => {
    console.log(c);
  })
  .catch((err) => { // yaha cathc karna jaruri hai
    console.log("=====", err);
  });

setTimeout(() => {
//   c.cancel();
}, 1000);
