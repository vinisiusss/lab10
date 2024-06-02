import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nickname,
      password,
    };

    fetch('/пользователь', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          navigate('/auth');
        } else {
          alert('Ошибка регистрации');
        }
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        alert('Ошибка регистрации');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nickname">Никнейм:</label>
      <input type="text" id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />

      <label htmlFor="password">Пароль:</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};
