import React, { useState, useEffect } from "react";
import './thumbnails.css'

function Photos({ albumId }) {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      .then((response) => response.json())
      .then((data) => setPhotos(data));
  }, [albumId]);

  return (
    <div>
      <h2>Photos</h2>
      {selectedPhoto ? (
        <div>
          <img src={selectedPhoto.url} alt={selectedPhoto.title} />
          <p>{selectedPhoto.title}</p>
        </div>
      ) : (
        <div className="photos">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              style={{ backgroundImage: `url(${photo.thumbnailUrl})` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Photos;