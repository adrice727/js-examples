var getTwo = function() {
	/**
   * return http.get('https://some-api/two')
   */
	return new Promise(function(resolve, reject) {
  	setTimeout(function(){
    	var success = Math.random() > .50;
      success ? resolve(2) : reject(`Ruh roh, couldn't get two`);
    }, 2000);
  });
};

var two = function() {
  return new Promise(function(resolve, reject) {
    resolve(2);
  });
};

var timesFour = function(x) {
  return new Promise(function(resolve, reject) {
    resolve(x * 4);
  });
};

var plus22 = function(x) {
	return new Promise(function(resolve, reject){
  	resolve(x + 22);
  });
};

var updateUI = function(result) {
  document.getElementById('result').innerHTML = `Result: ${result}`;
}

var displayError = function(error) {
  document.getElementById('error').innerHTML = `Error: ${error}`;
}

var reset = function(){
	  document.getElementById('result').innerHTML = '';
    document.getElementById('error').innerHTML = '';
    document.getElementById('calc').classList.remove('hidden');
}

var allDone = function() {
  document.getElementById('waiting').classList.add('hidden');
  setTimeout(reset, 3000);
}

var calculate = function(){
  document.getElementById('calc').classList.add('hidden');
  document.getElementById('waiting').classList.remove('hidden');
	getTwo()
  .then(timesFour)
  .then(plus22)
  .then(updateUI)
  .catch(displayError)
  .finally(allDone)
}

document.getElementById('calc').addEventListener('click', calculate);


