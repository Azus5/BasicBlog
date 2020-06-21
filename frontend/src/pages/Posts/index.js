import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import './styles.css'

export default function Posts() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([])
  const history = useHistory();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('userData'));
    
    axios.get('http://localhost:3000/posts', {user},{withCredentials: true})
      .then(response => {
        if(response.data.length > 0) {
          setPosts(response.data);
        }
      })
  }, []);

  function handleSubmit(e) {
    e.preventDefault()

    let post = {
      title,
      content,
    }

    let user = JSON.parse(localStorage.getItem('userData'));

    axios.post('http://localhost:3000/posts', {post}, {withCredentials: true})
    .then(response => {
      console.log(response.data)
    })
  }

  function handleLogout() {
    localStorage.removeItem('userLogged');
    localStorage.removeItem('userData');
  }

  function handleClick() {
    axios.delete('http://localhost:3000/logout', { withCredentials: true })
      .then(response => {
        handleLogout();
        history.push('/')
      }).catch(err => console.log('Error: ' + err.message))
  }

  return (
    <div className="container">
      <header>
        <Link className="header-option" to="/">
          Home
        </Link>

        <Link className="header-option" to='/' onClick={() => handleClick()}>
          Logout
        </Link>
      </header>

      <form className="form-posts" onSubmit={handleSubmit}>
        <div className="inputs-flex">
          <input
            type="text"
            name="title"
            placeholder="Write the post title here"
            className="input-posts"
            value={title}
            onChange={e => setTitle(e.target.value)} />

          <input
            type="text"
            name="content"
            placeholder="Write the post description here"
            className="input-posts large-input"
            value={content}
            onChange={e => setContent(e.target.value)} />
          </div>

          <button type="submit">POST!</button>
      </form>
      <div className="posts">
        {posts.map(post => {
          return (
            <div key={post.id} className="post">
              <h1 className="post-title">{post.title}</h1>
              <p className="post-content">{post.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}