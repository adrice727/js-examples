
// With node-style callbacks
function doAsyncThings() {
  doAsyncOne(function(err, result) {
    if (!err) {
      doAsyncTwo(result, function(err, result) {
        if (!err) {
          doAsyncThree(result, function(err, result) {
            //  . . . etc.
          })
        } else {
          handleError(err)
        }
      })
    } else {
      handleError(err);
    }
  })
}

// With promises
function doAsyncThings() {
  doAsyncOne()
  .then(doAsyncTwo)
  .then(doAsyncThree)
  .catch(handleError);
}

/**
 * Return promises from within node callbacks
 */

const api = require('api');
const getUser = function(id) {
  return new Promise(function(resolve, reject){
    api.getUser(id, function(err, data){
      if (err) {
        reject(err);
      } else {
        resolve(data)
      }
    })
  });
}

getUser('98adjsnf')
.then(userData => console.log(userData));


/**
 * Using bluebird's promisify allows use to call the api method directly
 * without having to wrap it in a promise.
 * http://bluebirdjs.com/docs/api/promisification.html
 */

const Promise = require('bluebird');
const api = Promise.promisifyAll(require('api'));

api.getUserAsync('98adjsnf')
.then(userData => console.log(userData));


/**
 * JS Fiddle from Class:
 * https://jsfiddle.net/c2dgdnL8/4/
 */

/** Arrow functions */
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// 'this' is the global scope with standard anonymous functions
var tim = {
  name: 'tim',
  getName: function(){
    setTimeout(function(){ console.log('Name: ',this.name)}, 2000)
  }
}
tim.getName(); // log 'Name: ' after 2 seconds


// 'this' is the containing scope with arrow functions
var tim = {
  name: 'tim',
  getName: function(){
    setTimeout(() => console.log('Name: ',this.name), 2000)
  }
}
tim.getName(); // log 'Name: tim' after 2 seconds
