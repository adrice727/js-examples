
function reduce(array, combine, start) {
  var current = start;
  for (var i = 0; i < array.length; i++)
    current = combine(current, array[i]);
  return current;
}

function flatten(array) {

  var concat = function(acc, el) {
    return acc.concat(el);
  }

  return reduce(array, concat, [])

};

var arrays = [
  [1, 2, 3],
  [4, 5],
  [6]
];

flatten(arrays); // => [1,2,3,4,5,6]


var Vector = function(x, y) {
  this.x = x;
  this.y = y;
  this.length = Math.sqrt((x * x) + (y * y));
}

var plus = function(vector) {
  var x = this.x + vector.x;
  var y = this.y + vector.y;
  return new Vector(x, y);
}

var minus = function(vector) {
  var x = this.x - vector.x;
  var y = this.y - vector.y;
  return new Vector(x, y);
}


Vector.prototype = {
  constructor: Vector,
  plus: plus.bind(this),
  minus: minus.bind(this)
}

console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);
// → 5

function forEach(iterator, array) {
  for (var i = 0; i < array.length; i++ ) {
    iterator(array[i]);
  }
}

function reduce(reducer, memo, array) {

  var result = memo;

  var iterator = function(x){
    result = reducer(result, x);
  };

  forEach(iterator, array);

  return result;
}

var sum = function(a,b) { return a + b;}
var nums = [1,2,3];
reduce(sum, 0, nums) // => 6;

// var flattenDeep = function(array){

//   var result = [];

//   var current;
//   for (var i = 0; i < array.length; i++ ) {
//     current = array[i];
//     if (Array.isArray(current)) {
//       result = result.concat(flattenDeep(current));
//     } else {
//       result = result.concat(current);
//     }
//   }

//   return result;
// }

var flattenDeep = function(array){

  var flatten = function(acc, value){
     if (Array.isArray(value)) {
       return acc.concat(flattenDeep(value));
     } else {
       return acc.concat(value);
     }
  };

  return reduce(flatten, [], array);
}

// flattenDeep([1, [2, [3, [4]], 5]]);
// ➜ [1, 2, 3, 4, 5]




