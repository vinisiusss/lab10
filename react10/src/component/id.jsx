import { useState, useEffect } from 'react';

export function Form() {
  const [id, setId] = useState('');
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error fetching post');
        }
      })
      .then((data) => setPost(data))
      .catch((error) => {
        console.error('Error fetching post:', error);
        setError('Error fetching post');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (post && post.userId) {
      fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Error fetching user');
          }
        })
        .then((data) => setUser(data))
        .catch((error) => {
          console.error('Error fetching user:', error);
          setError('Error fetching user');
        });
    }
  }, [post]);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="id">ID:</label>
      <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Нажми'}
      </button>
      {error && <p>{error}</p>}
      {post && user && (
        <>
          <p>Заголовок: {post.title}</p>
          <p>Сообщение: {post.body}</p>
          <p>Имя: {user.name}</p>
          <p>Почта: {user.email}</p>
        </>
      )}
    </form>
  );
};