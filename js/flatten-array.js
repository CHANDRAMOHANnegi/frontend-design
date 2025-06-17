// Flatten Array

// [1, [2, [3]]]  --> [1, 2, 3]

const arr = [1, [2, [3]]];

const flat = arr.flat(2);

console.log(flat);

// It is identical to a map() followed by a flat() of depth 1 (arr.map(...args).flat()),
// but slightly more efficient than calling those two methods separately.
