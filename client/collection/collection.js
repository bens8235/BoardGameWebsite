const newCollectionForm = document.getElementById("collectionForm");
const addCollection = document.getElementById("createBtn");
const collectionContainer = document.getElementById("collectionContainer");
const createNewCollectionBtn = document.getElementById(
  "createNewCollectionBtn"
);

async function getCollection() {
  const response = await fetch("http://localhost:8080/collection");
  const collections = response.json();

  Object.keys(collections).forEach(function (collection) {
    const { item_name, bought_date, bought_price, description } = collection;
    const collectionCard = document.createElement("div");
    collectionCard.id = "collectionCard";

    const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    const pDes = document.createElement("p");
    h3.textContent = `${item_name}`;
    h4.textContent = `${bought_date}`;
    p.textContent = `£${bought_price}`;
    pDes.textContent = `${description}`;
    collectionCard.appendChild(h3);
    collectionCard.appendChild(h4);
    collectionCard.appendChild(p);
    collectionCard.appendChild(pDes);
    collectionContainer.appendChild(collectionCard);
  });
}

async function createNewCollection() {
  const formData = new FormData(newCollectionForm);
  const formValues = Object.fromEntries(formData);

  const response = await fetch("http://localhost:8080/collection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });
  const json = await response.json();
  console.log(json, "json");
  newCollectionForm.reset();

  const item_name = formValues.item_name;
  const bought_date = formValues.bought_date;
  const bought_price = formValues.bought_price;
  const description = formValues.description;
  const collectionCard = document.createElement("div");

  collectionCard.id = "collectionCard";

  const h3 = document.createElement("h3");
  const h4 = document.createElement("h4");
  const p = document.createElement("p");
  const pDes = document.createElement("p");
  h3.textContent = `${item_name}`;
  h4.textContent = `${bought_date}`;
  p.textContent = `£${bought_price}`;
  pDes.textContent = `${description}`;
  collectionCard.appendChild(h3);
  collectionCard.appendChild(h4);
  collectionCard.appendChild(p);
  collectionCard.appendChild(pDes);
  collectionContainer.appendChild(collectionCard);
}

createNewCollectionBtn.addEventListener("click", function () {
  newCollectionForm.style.opacity = "1";
  newCollectionForm.style.pointerEvents = "all";
});

newCollectionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createNewCollection();
  newCollectionForm.style.opacity = "0";
  newCollectionForm.style.pointerEvents = "none";
});

getCollection();
