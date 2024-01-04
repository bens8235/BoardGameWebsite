const event9th = document.querySelector(".event9th");
const event20th = document.querySelector(".event20th");
const event21st = document.querySelector(".event21st");
const event31st = document.querySelector(".event31st");
const mon = document.querySelectorAll(".mon");
const tue = document.querySelectorAll(".tue");
const wed = document.querySelectorAll(".wed");
const thu = document.querySelectorAll(".thu");
const days = document.querySelectorAll(".days li");
const img = document.querySelector(".img");
let counter = 0;

function displayEvent(eventInfo, eventInfo2, events) {
  if (counter > 0) {
    document.querySelector(".event-details").remove();
  }
  const eventDiv = document.createElement("div");
  eventDiv.classList.add("event-details");
  document.querySelector("body").appendChild(eventDiv);
  const p = document.createElement("p");
  p.textContent = eventInfo;
  eventDiv.appendChild(p);
  if (events > 1) {
    const p2 = document.createElement("p");
    p2.textContent = eventInfo2;
    eventDiv.appendChild(p2);
  }

  counter += 1;
}

for (let i = 0; i < days.length; i++) {
  days[i].addEventListener("mouseover", function () {
    for (let i = 0; i < days.length; i++) {
      days[i].classList.remove("active");
      if (counter > 0) {
        document.querySelector(".event-details").remove();
        counter = 0;
      }
    }
    days[i].classList.add("active");
  });
}

event9th.addEventListener("mouseover", function () {
  displayEvent(
    "Blood on the Clocktower at Slice & Dice: 6-10pm.",
    "Norwich Board Gamers at St Andrews Brewhouse: 7:30-11pm.",
    2
  );
});

event20th.addEventListener("mouseover", function () {
  displayEvent("Watton All Dayer 10-11pm", "", 1);
});

event21st.addEventListener("mouseover", function () {
  displayEvent("Blood on the Clocktower at Slice & Dice: 4-8pm.", "", 1);
});

event31st.addEventListener("mouseover", function () {
  displayEvent("Blood on the Clocktower at Slice & Dice: 6-10pm.", "", 1);
});

for (let i = 0; i < mon.length; i++) {
  mon[i].addEventListener("mouseover", function () {
    displayEvent(
      "Norwich Board Gamers at St Andrews Brewhouse: 7:30-11pm.",
      "",
      1
    );
  });
}

for (let i = 0; i < tue.length; i++) {
  tue[i].addEventListener("mouseover", function () {
    displayEvent(
      "Norwich Board Gamers at St Andrews Brewhouse: 7:30-11pm.",
      "",
      1
    );
  });
}

for (let i = 0; i < wed.length; i++) {
  wed[i].addEventListener("mouseover", function () {
    displayEvent("Slice & Dice Social Gaming 6-10pm", "", 1);
  });
}

for (let i = 0; i < thu.length; i++) {
  thu[i].addEventListener("mouseover", function () {
    displayEvent("The Games Table 6-11pm", "", 1);
  });
}

img.addEventListener("mouseover", function () {
  for (let i = 0; i < days.length; i++) {
    days[i].classList.remove("active");
    if (counter > 0) {
      document.querySelector(".event-details").remove();
      counter = 0;
    }
  }
});
