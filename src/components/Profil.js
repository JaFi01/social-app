import React, { useState, useEffect } from "react";
import "../App.css"

function Profil(props) {
    const { user } = props;

    return (
        <div>
          <h2>Profil użytkownika {user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Numer telefonu: {user.phone}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <div className="adress"> 
            <p>szipcodetreet: {user.address.street}</p>
            <p>city: {user.address.city}</p>
            <p>zipcode: {user.address.zipcode}</p>
          </div>

        </div>
      );
    }

export default Profil;