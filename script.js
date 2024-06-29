var form = document.getElementById("form");
var result = document.getElementById("result");

console.log("Script is working");

const numberConv = {};

numberConv[0] = "yone";
numberConv[1] = "ytwo";
numberConv[2] = "ythree";
numberConv[3] = "yfour";
numberConv[4] = "yfive";
numberConv[5] = "ysix";

var balance = 0;
var jackpot = 0;
var plays = 0;
var best = 0;
var winnings = 0;

const numberConv2 = {};

numberConv2[0] = "one";
numberConv2[1] = "two";
numberConv2[2] = "three";
numberConv2[3] = "four";
numberConv2[4] = "five";
numberConv2[5] = "six";
let wnum

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit').addEventListener('click', function () { 
      wnum = getWNumbers();
      if (document.getElementById("auto").checked == true) {
            forever(true);
      } else {
         for (var i=0; i < document.forms["form"]["amount"].value; i++) {
            setTimeout(main, 100);
            console.log(i);
         }

      }

   });
});


function forever() {
   setInterval(function() {
      wnum = getWNumbers();
      for (var i=0; i < document.forms["form"]["amount"].value; i++) {
         setTimeout(main, 100);
         console.log(i);
      }
   }, 1/100);
}

function createDiv() {
   const div = document.createElement("div");
    
   div.id = "div_id" ;
   div.className = "div_class";
   div.style = "background-color: red;";
   div.style.width = "100px";
   div.style.height = "100px";
   document.body.appendChild(div);  
}
function checkValues() {
   const values = []
   if (document.getElementById("qp").checked == true) {
      one = getRandomInt(1, 69);
      two = getRandomInt(1, 69);
      three = getRandomInt(1, 69);
      four = getRandomInt(1, 69);
      five = getRandomInt(1, 69);
      six = getRandomInt(1, 26);
      
      values.push(one, two, three, four, five, six);
      return [true, values];
   }

   for (var i = 0; i < 6; i++){
      var number = document.getElementById(i + 1).value;
      if (i <= 4) {
         if (number < 1 || number > 69) { // if the number is regular (not powerball)
            document.getElementById("failed").style.display = "block";
            return [false, null];
         }
      } else if (i > 4) { // if the number is the powerball
         if (number < 1 || number > 26) {
            document.getElementById("failed").style.display = "block";
            return [false, null];
         }
      }
      values.push(number);
   }
   return [true, values];
}

function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayValues(usernum, wnum) {
   if (usernum[0]) {
      const values = usernum[1];
      for (var i = 0; i < 6; i++) {
         document.getElementById(numberConv[i]).textContent = values[i];
      }
   }
   if (wnum.length != 0) {
      for (var i = 0; i < 6; i++) {
         document.getElementById(numberConv2[i]).textContent = wnum[i];
      }
   }
}

function getWNumbers() {
   const numbers = [];
   one = getRandomInt(1, 69);
   two = getRandomInt(1, 69);
   three = getRandomInt(1, 69);
   four = getRandomInt(1, 69);
   five = getRandomInt(1, 69);
   six = getRandomInt(1, 26);
   
   numbers.push(one, two, three, four, five, six);
   return numbers
}

function calculateWinnings(usernum, wnum) {
   usernum = usernum[1];
   var count = 0;
   var pb = false;

   for (var i=0;i<5;i++) {
      if (usernum[i] == wnum[i]) {
         count += 1;
      }
   }
   if (usernum[5] == wnum[5]) {
      pb = true;
   }
   // if (count > 0 || pb){
   //    console.log(count + " have matched and the powerball is " + pb);
   // }
   console.log(count);
   if ((pb) || (count == 1 && pb)) {
      console.log(usernum + " " + wnum);
      return [4, count, pb];
   } else if ((count == 2 && pb) || (count == 3)) {
      console.log(usernum + " " + wnum);
      return [7, count, pb];
   } else if ((count == 3 && pb) || (count == 4)) {
      console.log(usernum + " " + wnum);
      return [100, count, pb];
   } else if (count == 4 && pb) {
      console.log(usernum + " " + wnum);
      return [50000, count, pb];
   } else if (count == 5) {
      console.log(usernum + " " + wnum);
      return [1000000, count, pb];
   } else if (count == 5 && pb) {
      console.log(usernum + " " + wnum);
      return [true, count, pb];
   } else {
      jackpot += 14600000;
      return [false, count, pb];
   }
}

function main() {
   const usernum = checkValues();
   if (usernum[0]){  
      document.getElementById("failed").style.display = "none";

      displayValues(usernum, wnum);

      const stuff = calculateWinnings(usernum, wnum);

      var won = stuff[0];
      var count = stuff[1];
      var pb = stuff[2];
      console.log(count);
      balance -= 2;
      plays += 1;
      if (typeof won == "number") {
         if (won > best) {
            best = won;
            
         }

         if (won > 0) {
            winnings += won;
         }
         balance += won;

      }
      
      
      document.getElementById("balance").textContent = "Balance: " + balance;
      document.getElementById("won").textContent = "Won: " + winnings;
      document.getElementById("best").textContent = "Best Win: " + best;
      document.getElementById("jackpot").textContent = "Jackpot: " + jackpot;
      document.getElementById("plays").textContent = "Plays: " + plays;


      console.log(won);
      // Create a new div element with the class "winners"
      if (typeof won == "number" && won > 4 || won == true) {
         const winnersDiv = document.createElement('div');
         winnersDiv.classList.add('winners');

         // Create a new paragraph element for "Numbers:"
         const numbersP = document.createElement('p');
         numbersP.textContent = 'Numbers: ' + usernum[1];
         winnersDiv.appendChild(numbersP);

         // Create a new paragraph element for "Winning Numbers:"
         const winningNumbersP = document.createElement('p');
         winningNumbersP.textContent = 'Winning Numbers: ' + wnum;
         winnersDiv.appendChild(winningNumbersP);

         // Create a new paragraph element for "Numbers matched:"
         const numbersMatchedP = document.createElement('p');
         numbersMatchedP.textContent = 'Numbers matched: ' + count;
         winnersDiv.appendChild(numbersMatchedP);

         // Create a new paragraph element for "Powerball matched:"
         const powerballMatchedP = document.createElement('p');
         powerballMatchedP.textContent = 'Powerball matched: ' + pb;
         winnersDiv.appendChild(powerballMatchedP);
         
         const wonP = document.createElement("p");
         wonP.textContent = "Won: " + won;
         winnersDiv.appendChild(wonP);
         // Append the entire "winners" div to the document
         document.body.appendChild(winnersDiv);
      }
   }
}

