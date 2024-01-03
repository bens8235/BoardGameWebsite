const circles = document.querySelectorAll(".circle");
const circlesArr = Array.from(circles);
let circlesArrSlice = [];
const winner = document.getElementById("winner");
let randNum = 0;
let firstPlayerPicked = true;
let numOfPlayers = 0;
const players = document.getElementsByClassName("player");
let count = 1;
let counter = 0;
const click = document.getElementById("click");
const circle = document.getElementById("circles");
let previousCircle = 0;

function numberOfPlayers() {
  circlesArrSlice = circlesArr.slice(0, numOfPlayers);
}

function randomNumber() {
  randNum = Math.floor(Math.random() * numOfPlayers) + 1;
}

window.addEventListener("keydown", function (event) {
  if (firstPlayerPicked === false) {
    for (let i = 0; i < circlesArrSlice.length; i++) {
      if (
        event.key === (i + 1).toString() &&
        event.repeat === false &&
        Number(event.key) === previousCircle + 1
      ) {
        previousCircle += 1;
        circlesArrSlice[i].style.visibility = "visible";

        if (event.key === circlesArrSlice.length.toString()) {
          setTimeout(function () {
            if (count === 1) {
              randomNumber();
              count += 1;
              winner.innerHTML = `The winner is player ${randNum}`;
              firstPlayerPicked = true;
              for (let i = 0; i < circlesArrSlice.length; i++) {
                if (randNum - 1 !== i) {
                  circlesArrSlice[i].style.visibility = "hidden";
                } else {
                  circle.classList.add("wiggle");
                }
              }
            }
          }, 1000);
        }
      }
    }
  }
});

click.addEventListener("click", function () {
  if (firstPlayerPicked === false) {
    if (counter < numOfPlayers) {
      circlesArrSlice[counter].style.visibility = "visible";
      counter += 1;
    }
    if (counter === numOfPlayers) {
      setTimeout(function () {
        if (count === 1) {
          randomNumber();
          count += 1;
          winner.innerHTML = `The winner is player ${randNum}`;
          firstPlayerPicked = true;
          for (let i = 0; i < circlesArrSlice.length; i++) {
            if (randNum - 1 !== i) {
              circlesArrSlice[i].style.visibility = "hidden";
            } else {
              circle.classList.add("wiggle");
            }
          }
        }
      }, 1000);
    }
  }
});

for (let i = 0; i < players.length; i++) {
  players[i].addEventListener("click", function () {
    for (let i = 0; i < players.length; i++) {
      players[i].classList.remove("btnselect");
    }
    players[i].classList.add("btnselect");
    for (let i = 0; i < circles.length; i++) {
      circles[i].style.visibility = "hidden";
      circle.classList.remove("wiggle");
      winner.innerHTML = "";
      firstPlayerPicked = false;
      count = 1;
      counter = 0;
      previousCircle = 0;
    }
    numOfPlayers = i + 2;
    numberOfPlayers();
  });
}
