var express = require('express');
var fetch = require('node-fetch');
const Rx = require('rxjs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');

  const url = 'https://jsonplaceholder.typicode.com/users/';
  
 // CASE 1 : USING PROMISES

/*   fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
      console.log(data);   
       res.render('users', { title: 'USERS' ,'users': data }); 
    });
  
  
  }); */
  
// CASE 2: USING REACTIVE PROGRAMMING (OBSERVABLES)

var jsondata =fetch(url).then((resp) => resp.json());

Rx.Observable.fromPromise(jsondata).subscribe(
  (value) => {
    console.log(value);
    res.render('users', { title: 'USERS' ,'users': value }); 
  },
  (e) => console.log(e.message),
  null
);
});

// CASE 3: USING ASYNC/AWAIT
/* (async () => {
  try {
    // request
    let response = await fetch(url);
    // parsing
    let data = await response.json();
    console.log('data: ', data);
    res.render('users', { title: 'USERS' ,'users': data }); 
  } catch (error) {
    console.log('error: ', error);
  }
})();
}); */

module.exports = router;
