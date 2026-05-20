import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

export default function Formations() {
  const [formations, setFormations] = useState([]);
  const [form, setForm] = useState({ titre: '', duree: '' });
  const [editId, setEditId] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const load = async () => {
    const { data } = await api.get('/formations');
    setFormations(data);
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await api.put(`/formations/${editId}`, form);
      setEditId(null);
    } else {
      await api.post('/formations', form);
    }
    setForm({ titre: '', duree: '' });
    load();
  };

  const handleEdit = (f) => {
    setEditId(f.id);
    setForm({ titre: f.titre, duree: f.duree });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette formation ?')) {
      await api.delete(`/formations/${id}`);
      load();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Gestion des Formations</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/admin/etudiants">Étudiants</Link>
          <button onClick={() => { logout(); navigate('/login'); }}>Déconnexion</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input
          placeholder="Titre de la formation"
          value={form.titre}
          onChange={e => setForm({ ...form, titre: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Durée (heures)"
          value={form.duree}
          onChange={e => setForm({ ...form, duree: e.target.value })}
          required
        />
        <button type="submit">{editId ? 'Modifier' : 'Ajouter'}</button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setForm({ titre: '', duree: '' }); }}>
            Annuler
          </button>
        )}
      </form>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%' }}>
        <thead style={{ background: '#f0f0f0' }}>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Durée (h)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formations.map(f => (
            <tr key={f.id}>
              <td>{f.id}</td>
              <td>{f.titre}</td>
              <td>{f.duree}</td>
              <td>
                <button onClick={() => handleEdit(f)} style={{ marginRight: 5 }}>Modifier</button>
                <button onClick={() => handleDelete(f.id)} style={{ color: 'red' }}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
