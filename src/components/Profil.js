import React, { useState } from "react";
import "../App.css";

function Profil(props) {
  const { user } = props;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  const handleEditClick = () => {
    setIsEditMode(true);
    setEditedUser(user);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSaveClick = () => {
    props.onSave(editedUser);
    setIsEditMode(false);
  };

  return (
    <div>
      <h2>Profil użytkownika {user.name}</h2>
      <p>
        <strong>Email:</strong>{" "}
        {isEditMode ? (
          <input
            type="text"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
          />
        ) : (
          user.email
        )}
      </p>
      <p>
        <strong>Phone:</strong>{" "}
        {isEditMode ? (
          <input
            type="text"
            name="phone"
            value={editedUser.phone}
            onChange={handleInputChange}
          />
        ) : (
          user.phone
        )}
      </p>
      <p>
        <strong>Website:</strong>{" "}
        {isEditMode ? (
          <input
            type="text"
            name="website"
            value={editedUser.website}
            onChange={handleInputChange}
          />
        ) : (
          user.website
        )}
      </p>
      <div className="adress">
        <p>
          <strong>szipcodetreet:</strong>{" "}
          {isEditMode ? (
            <input
              type="text"
              name="street"
              value={editedUser.address.street}
              onChange={handleInputChange}
            />
          ) : (
            user.address.street
          )}
        </p>
        <p>
          <strong>city:</strong>{" "}
          {isEditMode ? (
            <input
              type="text"
              name="city"
              value={editedUser.address.city}
              onChange={handleInputChange}
            />
          ) : (
            user.address.city
          )}
        </p>
        <p>
          <strong>zipcode:</strong>{" "}
          {isEditMode ? (
            <input
              type="text"
              name="zipcode"
              value={editedUser.address.zipcode}
              onChange={handleInputChange}
            />
          ) : (
            user.address.zipcode
          )}
        </p>
      </div>
      {isEditMode ? (
        <button onClick={handleSaveClick}>Zapisz</button>
      ) : (
        <button onClick={handleEditClick}>Edytuj</button>
      )}
    </div>
  );
}

export default Profil;
