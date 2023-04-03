import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Photos = () => {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${userId}`)
      .then(response => response.json())
      .then(data => setPhotos(data));
  }, [userId]);

  return (
    <div>
      <h2>Photos</h2>
      <ul>
        {photos.map(photo => (
          <li key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Photos;
