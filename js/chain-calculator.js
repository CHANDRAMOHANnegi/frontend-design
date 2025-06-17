class Calculator {
  constructor() {
    this.val = 0;
    this.operations = [];
    this.isStopped = false;
  }
  add(num) {
    this.operations.push(() => {
      this.val += num;
      console.log("add", this.val);
    });
    this.calculate();
    return this;
  }

  subtract(num) {
    this.operations.push(() => {
      this.val -= num;
      console.log("subtract", this.val);
    });
    this.calculate();
    return this;
  }

  multiply(num) {
    this.operations.push(() => {
      this.val *= num;
      console.log("multiply", this.val);
    });
    this.calculate();
    return this;
  }

  delay(ms) {
    console.log("delay start", ms);

    this.isStopped = true;
    setTimeout(() => {
      this.isStopped = false;
      console.log("delay end", ms);
      this.calculate();
    }, ms);
    this.calculate();
    return this;
  }

  calculate() {
    while (this.operations.length && !this.isStopped) {
      console.log("--", this.operations);
      this.operations.shift()();
    }
  }
}

const cal = new Calculator();

const res = cal.add(5).subtract(3).delay(2000).multiply(2).val;
console.log(res);

