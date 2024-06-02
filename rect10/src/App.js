import { Login, Register } from './component/register'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function App()  {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nickname,
      password,
    };
    

    fetch('/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          navigate('/');
        } else {
          alert('Ошибка авторизации');
        }
      })
      .catch((error) => {
        console.error('Error authenticating user:', error);
        alert('Ошибка авторизации');
      });
  };

  return (
    {
      path: '/component',
      element: <Register />,
      redirect: '/',
    },
    <form onSubmit={handleSubmit}>
      <label htmlFor="nickname">Никнейм:</label>
      <input type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />

      <label htmlFor="password">Пароль:</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button type="submit">Войти</button>
    </form>
  );
};

export default App;

