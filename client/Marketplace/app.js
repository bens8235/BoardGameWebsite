const newListingForm = document.getElementById("newListingForm");
const createNewListingBtn = document.getElementById("createNewListingBtn");
const listingArea = document.getElementById("listingArea");

// The below function gets all of the database entries (game listings) and displays them on the page when it is loaded.
async function getListings() {
    const response = await fetch("http://localhost:8080/marketplacelistings");
    const listings = await response.json();
    listings.forEach(function(listing) {
        const { title, price, condition} = listing;
        const listingCard = document.createElement("div");
        listingCard.id = "listingCard";
        const h3 = document.createElement("h3");
        const h4 = document.createElement("h4");
        const p = document.createElement("p");
        h3.textContent = `${title}`;
        h4.textContent = `£${price}`;
        p.textContent = `${condition}`;
        listingCard.appendChild(h3);
        listingCard.appendChild(h4);   
        listingCard.appendChild(p);
        listingArea.appendChild(listingCard);
    });
}

getListings();

// This is the event listener for creating a new listing from the main marketplace page //
createNewListingBtn.addEventListener("click", function() {
    newListingForm.style.opacity = "1";
    newListingForm.style.pointerEvents = "all";
});

// Below is the function for posting new data to the database when a user creates a new listing for sale. //
async function createNewListing() {
    const formData = new FormData(newListingForm);
    const formValues = Object.fromEntries(formData);
    const response = await fetch("http://localhost:8080/marketplacelistings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formValues),              
    })
    newListingForm.reset();
    const title = formValues.title;
    const price = formValues.price;
    const condition = formValues.condition;
    const description = formValues.description;
    const listingCard = document.createElement("div");
    listingCard.id = "listingCard";
    const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    h3.textContent = `${title}`;
    h4.textContent = `£${price}`;
    p.textContent = `${condition}`;
    listingCard.appendChild(h3);
    listingCard.appendChild(h4);
    listingCard.appendChild(p);
    listingArea.appendChild(listingCard);
};

// Event listener for create button on form //
newListingForm.addEventListener("submit", function(event) {
    event.preventDefault();
    createNewListing();
    newListingForm.style.opacity = "0";
    newListingForm.style.pointerEvents = "none";
});

