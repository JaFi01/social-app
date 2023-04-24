import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import GeneralFeed from './components/GeneralFeed';
import Photos from './components/Photos';
import Profil from "./components/Profil";
import Albums from "./components/Albums";
import './App.css'

function App() {
  const [user, setUser] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [loadingComments, setLoadingComments] = useState(false);

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

  useEffect(() => {
    async function fetchComments(postId) {
      setLoadingComments(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      const data = await response.json();
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: data,
      }));
      setLoadingComments(false);
    }

    if (posts.length > 0) {
      posts.forEach((post) => {
        fetchComments(post.id);
      });
    }
  }, [posts]);


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
              <Link to="/profil">Profil</Link>
            </li>
            <li>
              <Link to="/general-feed">General Feed</Link>
            </li>
            <li>
              <Link to="/photos">Photos</Link>
            </li>
            <li>
              <Link to="/albums">Albums</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Wyloguj się</button>
            </li>
          </ul>
        </nav>
        <h1>Witaj, {user.name}!</h1>
        <div>
          <Routes>
            <Route path="/profil" element={<Profil />} />
            <Route path="/general-feed" element={<GeneralFeed />} />
            <Route path="/photos" element={<Photos user={user} />} />
            <Route path="/albums" element={<Albums />}/>
          </Routes>
        </div>
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
        <div posty>
        <h2>Moje wcześniejsze posty:</h2>
        {myPosts.length > 0 ? (
          myPosts.map((post) => (
            <div key={post.id}>
              <h3 style={{ fontSize: "1.2em" }}>{post.title}</h3>
              <p>{post.body}</p>
              {comments[post.id] ? (
                <div>
                  <h4>Komentarze:</h4>
                  {comments[post.id].map((comment) => (
                    <div key={comment.id}>
                      <p>{comment.body}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Brak komentarzy do wyświetlenia.</p>
              )}
            </div>
          ))
        ) : (
          <p>Brak postów do wyświetlenia.</p>
        )}
      </div>
        
      </div>
    </BrowserRouter>
);
}

export default App;