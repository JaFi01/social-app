import React, { useState, useEffect } from "react";

function GeneralFeed() {
  const [posts, setPosts] = useState([]);
  const [minChars, setMinChars] = useState(0);
  const [maxChars, setMaxChars] = useState(1000);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
      });
  }, []);

  const handleMinCharsChange = (event) => {
    setMinChars(event.target.value);
  };

  const handleMaxCharsChange = (event) => {
    setMaxChars(event.target.value);
  };

  const handleShowPosts = () => {
    const filtered = posts.filter((post) => {
      const bodyLength = post.body.length;
      return bodyLength > minChars && bodyLength < maxChars;
    });
    setFilteredPosts(filtered);
  };

  return (
    <div>
      <h2>General Feed</h2>
      <label>
        Minimalna ilość znaków:
        <input
          type="number"
          value={minChars}
          onChange={handleMinCharsChange}
        />
      </label>
      <br />
      <label>
        Maksymalna ilość znaków:
        <input
          type="number"
          value={maxChars}
          onChange={handleMaxCharsChange}
        />
      </label>
      <br />
      <button onClick={handleShowPosts}>Pokaż posty</button>
      {filteredPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default GeneralFeed;
