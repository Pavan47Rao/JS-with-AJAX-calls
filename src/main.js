import './../scss/main.scss';
const url = 'https://api.worldtradingdata.com/api/v1/stock?symbol=SNAP,TWTR,VOD.L&api_token=demo';
let xhrFn = (resolve, reject) => {
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

let count = 0;
let filterText = data => {
  let inputText = document.getElementById('stock-type').value;
  if(inputText.includes(',')) {
    let inputArray = inputText.split(',');
    console.log(inputArray);
    inputArray.forEach(element => {
      if(data[0].symbol == inputText) {
        console.log("found");
        console.log(data[0]);
        count++;
      }
      else if(data[1].symbol == inputText) {
        console.log("found");
        count++;
      }
      else if(data[2].symbol == inputText) {
        console.log("found");
        count++;
      }
    });
  }
  if(data[0].symbol == inputText) {
    console.log("found");
    console.log(data[0]);
  }
  else if(data[1].symbol == inputText) {
    console.log("found");
  }
  else if(data[2].symbol == inputText) {
    console.log("found");
  }
  else{
    console.log("not found");
  }
}
/*

 */
import { fromEvent } from "rxjs";
// let rxjs = require('rxjs');
let nextNode = document.getElementById('submit');
const event$ = fromEvent(nextNode, 'click'); 
let subscription = event$.subscribe(function (x) {
    fetch(url)
    .then(response => response.json())
    .then(resp =>
      filterText(resp.data)
    )
    // promise
    // .then(response => response.json())
    // .then(resp =>
    //   console.log(resp.data))
});