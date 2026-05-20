import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      login(data.token, data.role);
      navigate(data.role === 'admin' ? '/admin/formations' : '/etudiant/formations');
    } catch {
      alert('Identifiants incorrects');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Se connecter</button>
      </form>
      <p>Pas de compte ? <Link to="/register">S'inscrire</Link></p>
    </div>
  );
}
