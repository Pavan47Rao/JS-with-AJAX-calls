import './../scss/main.scss';
// let submitBtn = document.getElementById('submit');
// let submitBtnClickListener = (event) => {
//     const url = 'https://api.worldtradingdata.com/api/v1/stock?symbol=SNAP,TWTR,VOD.L&api_token=demo';
//     fetch(url)
//     .then((response) => response.json())
//     .then(function(data) {
//         console.log(data)
//     })
// }
// submitBtn.addEventListener('click',submitBtnClickListener);

/**
 * let xhrFn = (resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => { 
      resolve(xhr.responseText);
    };
    xhr.onerror = () => {
      reject(xhr.statusText)
    };
    xhr.send();
  }
let promise = new Promise(xhrFn);

promise.then(
  ()=> console.log('successful'),
  () => console.log('failed')
);
 */
import { fromEvent } from "rxjs";
// let rxjs = require('rxjs');
let nextNode = document.getElementById('submit');
const event$ = fromEvent(nextNode, 'click'); 
let subscription = event$.subscribe(function (x) {
 console.log('Hey you just click me!');
 const url = 'https://api.worldtradingdata.com/api/v1/stock?symbol=SNAP,TWTR,VOD.L&api_token=demo';
    fetch(url)
    .then((response) => response.json())
    .then(function(data) {
        console.log(data)
    })
});