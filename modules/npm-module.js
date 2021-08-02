// Load the full build.
var _ = require('lodash');//npm i lodash

var array = [1];
var other = _.concat(array, 2,[3,4]);

console.log(other)
_.indexOf([1, 2, 1, 2], 2);
// => 1
 
// Search from the `fromIndex`.
_.indexOf([1, 2, 1, 2], 2, 2);
// => 3



_.intersection([2, 1], [2, 3]);
// => [2]


_.last([1, 2, 3]);
// => 3

_.lastIndexOf([1, 2, 1, 2], 2);
// => 3