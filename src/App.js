import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import GeneralFeed from './components/GeneralFeed';
import Photos from './components/Photos';

function App() {
  const [user, setUser] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [posts, setPosts] = useState([]);

  function handleLogin(user) {
    setUser(user);
  }

  function handleLogout() {
    setUser(null);
  }

  useEffect(() => {
    if (user) {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
        .then((response) => response.json())
        .then((data) => setPosts(data));
    }
  }, [user]);

  function handlePostSubmit() {
    const newPost = {
      userId: user.id,
      id: posts.length + 1,
      title: postTitle,
      body: postBody,
    };
    setPosts([...posts, newPost]);
    setPostTitle("");
    setPostBody("");
  }

  function handleTitleChange(e) {
    setPostTitle(e.target.value);
  }

  function handleBodyChange(e) {
    setPostBody(e.target.value);
  }

  const myPosts = posts.filter((post) => post.userId === user?.id);

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <a href="#">Profil</a>
            </li>
            <li>
              <Link to="/general-feed">General Feed</Link>
            </li>
            <li>
              <Link to="/photos">Photos</Link>
            </li>
            <li>
              <a href="#">Albums</a>
            </li>
            <li>
              <button onClick={handleLogout}>Wyloguj się</button>
            </li>
          </ul>
        </nav>
        <h1>Witaj, {user.name}!</h1>
        <div>
          <h2>Zamieść nowy post:</h2>
          <label>Tytuł posta:</label>
          <input type="text" value={postTitle} onChange={handleTitleChange} />
          <br />
          <label>Treść posta:</label>
          <textarea rows="3" value={postBody} onChange={handleBodyChange}></textarea>
          <br />
          <button onClick={handlePostSubmit}>Zamieść post</button>
        </div>
        <div>
          <h2>Moje wcześniejsze posty:</h2>
          {myPosts.length > 0 ? (
            myPosts.map((post) => (
              <div key={post.id}>
                <h3 style={{ fontSize: "1.2em" }}>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            ))
          ) : (
            <p>Brak postów do wyświetlenia.</p>
          )}
        </div>
        <Routes>
          <Route path="/general-feed" element={<GeneralFeed />} />
          <Route path="/photos" element={<Photos />} />
        </Routes>
      </div>
    </BrowserRouter>
);
}

export default App;