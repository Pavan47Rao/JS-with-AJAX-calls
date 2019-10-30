import './../scss/main.scss';
import { fromEvent } from "rxjs";

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


let stackRow;
let filterText = data => {
    let count = 0;
    let arrayOfIndices = new Array();
    let inputText = document.getElementById('stock-type').value;
    if(inputText) {
        inputText = inputText.toUpperCase();
        if(inputText.includes(',')) {
          let inputArray = inputText.split(',');
          console.log(inputArray);
          inputArray.forEach(element => {
            if(data[0].symbol == element) {
              count++;
              arrayOfIndices.push(0);
            }
            else if(data[1].symbol == element) {
              count++;
              arrayOfIndices.push(1);
            }
            else if(data[2].symbol == element) {
              count++;
              arrayOfIndices.push(2);
            }
          });
        }
        else {
          if(data[0].symbol == inputText) {
            count++;
            stackRow = data[0];
          }
          else if(data[1].symbol == inputText) {
            count++;
            stackRow = data[1];
          }
          else if(data[2].symbol == inputText) {
            count++;
            stackRow = data[2];
          }
          else{
            console.log("not found");
          }
        }
        
        if(count>0){
          let existingTable = document.getElementById('empTable');
          if(existingTable) {
            existingTable.remove();
          }
          createTable();
          if(count>1){
            arrayOfIndices.forEach(element => {
              createRow(data[element]);
            });
            // for (let index = 0; index < count; index++) {
            //   createRow(data[index]);        
            // }
          }
          if(count==1) {
            createRow(stackRow);
          }
        }
  }
}

// ARRAY FOR HEADER.
var arrHead = new Array();
arrHead = ['52 Week High','52 Week Low','Change Pct','Close Yesterday','Currency','Day Change','Day High','Day Low','EPS','GMT Offset','Last Trade Time','Market Cap','Name','PE','Price','Price Open','Shares','Stock Exchange Long','Stock Exchange Short','Symbol','Timezone','Timezone Name','Volume','Volume Avg']; 
let titles = new Array();
titles = ['52_week_high','52_week_low','change_pct','close_yesterday','currency','day_change','day_high','day_low','eps','gmt_offset','last_trade_time','market_cap','name','pe','price','price_open','shares','stock_exchange_long','stock_exchange_short','symbol','timezone','timezone_name','volume','volume_avg'];
// FIRST CREATE A TABLE STRUCTURE BY ADDING A FEW HEADERS AND
// ADD THE TABLE TO YOUR WEB PAGE.
function createTable() {
    var empTable = document.createElement('table');
    empTable.setAttribute('id', 'empTable');            // SET THE TABLE ID.

    var tr = empTable.insertRow(-1);

    for (var h = 0; h < arrHead.length; h++) {
      var th = document.createElement('th');          // TABLE HEADER.
      th.innerHTML = arrHead[h];
      tr.appendChild(th);
    }

    var div = document.getElementById('stock-table');
    div.appendChild(empTable);    // ADD THE TABLE TO YOUR WEB PAGE.
}

function createRow(stackRow) {
    let empTab = document.getElementById('empTable');
    let rowCnt = empTab.rows.length;        // GET TABLE ROW COUNT.
    let tr = empTab.insertRow(rowCnt);      // TABLE ROW.
    tr = empTab.insertRow(rowCnt);
    for (var c = 0; c < arrHead.length; c++) {
      let td = document.createElement('td');          // TABLE DEFINITION.
      td = tr.insertCell(c);
      let ele = document.createElement('div');
      ele.innerHTML = stackRow[titles[c]];
      td.appendChild(ele);
    }
}

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