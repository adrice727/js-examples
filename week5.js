assign({}, {a:33}, {b:77}) // returns {a:33, b:77}
assign({a:22}, {a:33}, {b:77}) // returns {a:33, b:77}
assign({}, {a:33}, {a:77}) // returns {a:77}

function assign(target, ...objs){

  objs.forEach(function(o){
    Object.keys(o).forEach(function(key){
      target[key] = o[key];
    })
  });

  return target;
}

var assign2 = function(target, ...sources) {
    var copyProps = function(target, source) {
        for (var prop in source) {
            target[prop]=source[prop];
        }
    }
    reduce(copyProps, target, sources);
    return target;
}

function get(path, obj) {

  var props = path.split('.');

  var reducer = function(acc, key) {
    if (!acc){ return acc; }
    var next = acc[key];
    if (!next) {
      return undefined;
    } else {
      return next;
    }
  }

  return props.reduce(reducer, obj)
}
get('a.x.c', {a:{b:{c:44}}}); // returns Error: cannot read property 'c' of undefined


get('user.address.zipCode', data);

var getUserZipCode = curry(get)('user.address.zipCode');
getUserZipCode(data);

function add = (a,b,c) {
  return a + b + c;
}

var addFive = add.curry(5);
addFive(10, 10); // returns 25
var addTwoAndThree = add.curry(2,3);
addTwoAndThree(4); // returns 9

function concat(delim, array) {
  return array.join(delim)
}

concat('.', ['a', 'b']); // returns 'a.b'
var concatWithPeriod = concat.curry('.');
concatWithPeriod(['a', 'b']); // returns 'a.b'

function add (a,b,c) {
  return a + b + c;
}

Function.prototype.curry = function(...args){
  var self = this;
  return function(...secondaryArgs){
    return self.apply(null, args.concat(secondaryArgs));
  }
}


/**
 * A more complete curry example
 * https://github.com/adrice727/hanuman#curry
 *
 * Returns a curried version of the supplied function
 * @param {Function} fn - The function to be curried
 * @param {...*} [args] - A single argument or series of arguments
 * TODO Preserve length of original function
 */
    const curry = (fn, args) => {

        args = args || [];

        return function () {

            const arity = fn.length;
            const combinedArgs = args.concat(Array.from(arguments));

            if (combinedArgs.length === arity) {
                return fn.apply(this, combinedArgs);
            } else {
                return curry(fn, combinedArgs);
            }

        };
    };
