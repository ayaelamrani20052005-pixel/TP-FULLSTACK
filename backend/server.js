const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/formations', require('./routes/formation.routes'));
app.use('/api/inscriptions', require('./routes/inscription.routes'));
app.use('/api/etudiants', require('./routes/etudiant.routes'));

app.listen(process.env.PORT, () =>
  console.log(`Backend running on port ${process.env.PORT}`)
);
