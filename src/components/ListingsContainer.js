import { useState, useEffect } from "react";
import ListingCard from "./ListingCard";
import NewListingForm from "./NewListingForm";
//import { v4 as uuidv4 } from "uuid";

function ListingsContainer({ search }) {
  const [listings, setListings] = useState([]);
  const [sortBy, setSortBy] = useState("id");

  useEffect(() => {
    fetch("http://localhost:6001/listings")
      .then(r => r.json())
      .then(setListings);
  }, []);

  function handleDeleteListing(id) {
    const newListings = listings.filter(listing => listing.id !== id);
    setListings(newListings);
  }

  function handleAddListing(newListing) {
    const updatedListingsArray = [newListing, ...listings];
    setListings(updatedListingsArray);
  }

  const filteredListings = listings.filter(listing => {
    return listing.description.toLowerCase().includes(search.toLowerCase());
  });

  // since the Array.sort() sort the array in place
  // no copy is made and thus we don't to assign a different
  // label to reference said array
  filteredListings.sort((listingA, listingB) => {
    if(sortBy === "id") {
      return listingA.id - listingB.id;
    } else {
      return listingA.location.localeCompare(listingB.location);
    }
  });

  return (
    <main>
      <NewListingForm onAddListing={handleAddListing} />
      <button onClick={() => setSortBy("id")}>Sort By Default</button>
      <button onClick={() => setSortBy("location")}>Sort By Location</button>
      <ul className="cards">
        {/* use the ListingCard component to display listings */}
        {filteredListings.map(listing => {
          return (
            <ListingCard 
              key={listing.id}
              listing={listing}
              onDeleteListing={handleDeleteListing}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default ListingsContainer;
