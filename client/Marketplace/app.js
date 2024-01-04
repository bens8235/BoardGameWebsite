const newListingForm = document.getElementById("newListingForm");
const createNewListingBtn = document.getElementById("createNewListingBtn");
const listingArea = document.getElementById("listingArea");
const listingCard = document.getElementById("listingCard");
// const {title, price, condition} = listing;

// The below function gets all of the database entries (game listings) and displays them on the page when it is loaded.
async function getListings() {
  const response = await fetch(
    "https://norfolk-board-gamers-server.onrender.com/marketplacelistings"
  );
  const listings = await response.json();
  listings.forEach(function (listing) {
    const { title, price, condition } = listing;
    const listingCard = document.createElement("div");
    listingCard.id = `listingCard-${listing.id}`;
    listingCard.classList.add("listingCard");
    const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    const buyGameBtn = document.createElement("button");
    buyGameBtn.id = "buyGameBtn";
    h3.textContent = `${title}`;
    h4.textContent = `£${price}`;
    p.textContent = `${condition}`;
    buyGameBtn.textContent = "Buy Now";
    listingCard.appendChild(h3);
    listingCard.appendChild(h4);
    listingCard.appendChild(p);
    listingCard.appendChild(buyGameBtn);
    listingArea.appendChild(listingCard);
    buyGameBtn.addEventListener("click", function () {
      deleteListing(listing.id);
    });
  });
}

getListings();

// This is the event listener for creating a new listing from the main marketplace page //
createNewListingBtn.addEventListener("click", function () {
  newListingForm.style.opacity = "1";
  newListingForm.style.pointerEvents = "all";
});

// Below is the function for posting new data to the database when a user creates a new listing for sale. //
async function createNewListing() {
  const formData = new FormData(newListingForm);
  const formValues = Object.fromEntries(formData);
  const response = await fetch(
    "https://norfolk-board-gamers-server.onrender.com/marketplacelistings",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    }
  );
  newListingForm.reset();
  const title = formValues.title;
  const price = formValues.price;
  const condition = formValues.condition;
  const description = formValues.description;
  const listingCard = document.createElement("div");
  listingCard.id = "listingCard";
  listingCard.classList.add("listingCard");
  const h3 = document.createElement("h3");
  const h4 = document.createElement("h4");
  const p = document.createElement("p");
  const buyGameBtn = document.createElement("button");
  buyGameBtn.id = "buyGameBtn";
  h3.textContent = `${title}`;
  h4.textContent = `£${price}`;
  p.textContent = `${condition}`;
  buyGameBtn.textContent = "Buy Now";
  listingCard.appendChild(h3);
  listingCard.appendChild(h4);
  listingCard.appendChild(p);
  listingCard.appendChild(buyGameBtn);
  listingArea.appendChild(listingCard);
}

// Event listener for create button on form //
newListingForm.addEventListener("submit", function (event) {
  event.preventDefault();
  createNewListing();
  newListingForm.style.opacity = "0";
  newListingForm.style.pointerEvents = "none";
});

// Event listener / function for buy now button to remove the listing from the marketplace & remove it from the database. //

// Function to delete a listing.
function deleteListing(id) {
  fetch(
    `https://norfolk-board-gamers-server.onrender.com/marketplacelistings/${id}`,
    {
      method: "DELETE",
    }
  );
  document.getElementById(`listingCard-${id}`).remove();
}
