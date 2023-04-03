import React, { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`https://jsonplaceholder.typicode.com/users?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          onLogin(data[0]);
        } else {
          alert("Podany adres e-mail nie istnieje w bazie.");
        }
      });
  }

  return (
    <div>
      <h1>Logowanie</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Adres e-mail:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit">Zaloguj się</button>
      </form>
    </div>
  );
}

export default Login;