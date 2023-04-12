import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Photos = (props) => {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const hasUserId = !!userId && !!props.user?.id;

  useEffect(() => {
    if (hasUserId) {
      fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${userId}&userId=${props.user.id}`)
        .then(response => response.json())
        .then(data => setPhotos(data));
    }
  }, [userId, props.user.id, hasUserId]);

  return (
    <div>
      <h2>Photos</h2>
      {hasUserId ? (
        <ul>
          {photos.map(photo => (
            <li key={photo.id}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <p>{photo.title}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak identyfikatora użytkownika.</p>
      )}
    </div>
  );
};

export default Photos;
