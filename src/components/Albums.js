import React, { useState, useEffect } from "react";
import "../App.css"

function Albums({ onSelectAlbum }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((data) => setAlbums(data));
  }, []);

  return (
    <div>
      <h2>Albums</h2>
      {albums.map((album) => (
        <div key={album.id} onClick={() => onSelectAlbum(album.id)}>
          <h3>{album.title}</h3>
        </div>
      ))}
    </div>
  );
}

function Photos({ albumId, onBackToAlbums }) {
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
      <button onClick={onBackToAlbums}>Back to Albums</button>
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

function AlbumsApp() {
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  const handleSelectAlbum = (albumId) => {
    setSelectedAlbumId(albumId);
  };

  const handleBackToAlbums = () => {
    setSelectedAlbumId(null);
  };

  return (
    <div>
      {!selectedAlbumId ? (
        <Albums onSelectAlbum={handleSelectAlbum} />
      ) : (
        <Photos albumId={selectedAlbumId} onBackToAlbums={handleBackToAlbums} />
      )}
    </div>
  );
}

export default AlbumsApp;