const char = document.getElementById("char");
const map = document.getElementById("map");
const speech = document.getElementById("speech");
const mapContainer = document.getElementById("map-container");
const carousel = document.querySelector(".carousel");
const toggle = document.getElementById("carousel-toggle");
let readyToClick = false;

let charBottom = 0;
let charLeft = 455;
let charTop = 200;
let counter = 0;

function move(
  event,
  yLower,
  yUpper,
  xLower,
  xUpper,
  leftBoundary,
  bottomBoundary,
  house
) {
  let firstMove = true;
  let houseNumber = house;
  if (
    event.offsetY >= yLower &&
    event.offsetY <= yUpper &&
    event.offsetX >= xLower &&
    event.offsetX <= xUpper
  ) {
    const interval = setInterval(function () {
      if (charLeft < leftBoundary && firstMove === true) {
        speech.style.visibility = "hidden";
        char.src = "./images/stand.png";
        counter += 1;
        if (counter % 2 === 0) {
          char.src = "./images/walk1.png";
          counter = 0;
        } else {
          char.src = "./images/walk2.png";
        }
        charLeft += 10;
        char.style.left = `${charLeft}px`;
      } else if (houseNumber === 1 || houseNumber === 2) {
        if (charTop < bottomBoundary) {
          counter += 1;
          if (counter % 2 === 0) {
            char.src = "./images/back2.png";
            counter = 0;
          } else {
            char.src = "./images/back1.png";
          }
          charTop += 10;
          char.style.bottom = `${charTop}px`;
        } else {
          houseNumber = 0;
          counter = 0;
        }
      } else if (houseNumber === 3) {
        speech.style.visibility = "hidden";
        firstMove = false;
        counter += 1;
        if (charLeft > 330) {
          if (counter % 2 === 0) {
            char.src = "./images/left1.png";
            counter = 0;
          } else {
            char.src = "./images/left2.png";
          }
          charLeft -= 10;
          char.style.left = `${charLeft}px`;
        } else if (charTop < bottomBoundary) {
          counter += 1;
          if (counter % 2 === 0) {
            char.src = "./images/back2.png";
            counter = 0;
          } else {
            char.src = "./images/back1.png";
          }
          charTop += 10;
          char.style.bottom = `${charTop}px`;
        } else {
          houseNumber = 0;
        }
      } else {
        char.style.visibility = "hidden";
        if (house === 1) {
          window.location.href =
            "http://127.0.0.1:3000/client/calendar/index.html";
        } else if (house === 2) {
          window.location.href =
            "http://127.0.0.1:3000/client/collection/index.html";
        } else {
          window.location.href =
            "http://127.0.0.1:3000/client/Marketplace/index.html";
        }
        counter = 0;
        clearInterval(interval);
      }
    }, 100);
  }
}

map.addEventListener("click", function (event) {
  console.log(event);
  if (readyToClick === true) {
    move(event, 154, 224, 616, 712, 645, 280, 1);
    move(event, 53, 129, 535, 627, 565, 380, 2);
    move(event, 153, 227, 295, 387, 460, 280, 3);
  }
});

function firstRun() {
  char.style.visibility = "visible";
  const interval2 = setInterval(function () {
    counter += 1;
    if (charBottom < 200) {
      if (counter % 2 === 0) {
        char.src = "./images/back2.png";
        counter = 0;
      } else {
        char.src = "./images/back1.png";
      }
      charBottom += 10;
      char.style.bottom = `${charBottom}px`;
    } else {
      char.src = "./images/front.png";
      speech.style.visibility = "visible";
      readyToClick = true;
      clearInterval(interval2);
    }
  }, 100);
}

toggle.addEventListener("click", function () {
  if (readyToClick === true) {
    toggle.src = "./images/map.png";
    mapContainer.classList.toggle("map-visible");
    speech.style.visibility = "hidden";
    char.style.visibility = "hidden";
    carousel.classList.toggle("carousel-visible");
    if (mapContainer.className !== "map-visible") {
      toggle.src = "./images/caroussel.png";
      char.style.bottom = 0;
      readyToClick = false;
      charBottom = 0;
      charLeft = 455;
      charTop = 200;
      counter = 0;
      firstRun();
    }
  }
});

firstRun();
