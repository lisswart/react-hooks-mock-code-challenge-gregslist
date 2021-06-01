import { useState } from "react";

function ListingCard({ listing, onDeleteListing }) {
  const { id, image, description, location } = listing;

  const [isFavorited, setIsFavorited] = useState(false);

  function handleDeleteClick() {
    fetch(`http://localhost:6001/listings/${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => {
      console.log("success!");
      onDeleteListing(id);      
    });    
  }



  return (
    
        <li className="card">
          <div className="image">
            <span className="price">$0</span>
            <img src={image} alt={description} />
          </div>
          <div className="details">
            {isFavorited ? (
              <button className="emoji-button favorite active"
                onClick={() => setIsFavorited(false)}>★</button>
            ) : (
              <button className="emoji-button favorite"
                onClick={() => setIsFavorited(true)}>☆</button>
            )}
            <strong>{description}</strong>
            <span> · {location}</span>
            <button 
              className="emoji-button delete"
              onClick={handleDeleteClick}
            >
              🗑
            </button>
          </div>
        </li>
      
  );
}

export default ListingCard;
