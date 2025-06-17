// Pipe and Compose

function pipe(...fns) {
  // left to right
  return (arg) => {
    return fns.reduce((all, fn) => fn(all), arg);
  };
}

function compose(...fns) {
  // right to left
  return (arg) => {
    return fns.reduceRight((all, fn) => fn(all), arg);
  };
}

const getSalary = (salary) => salary;
const addBonusThousand = (salary) => salary + 1000;
const deductTax = (salary) => salary - 100;

const result = pipe(getSalary, addBonusThousand, deductTax)(10000);
const result2 = compose(deductTax, addBonusThousand, getSalary)(10000);

console.log(result, result2);
