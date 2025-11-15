const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://karina2005reyes_db_user:6eHZL97SyZ0WdzI0@game.t1iu0ms.mongodb.net/?appName=GAME')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.log('❌ Error al conectar:', err));

// Esquema y modelo
const JuegoSchema = new mongoose.Schema({
  nombre: String,
  plataforma: String,
  genero: String,
  horasJugadas: Number,
  imagen: String
});

const Juego = mongoose.model('Juego', JuegoSchema);

// Rutas
app.get('/api/juegos', async (req, res) => {
  const juegos = await Juego.find();
  res.json(juegos);
});

app.post('/api/juegos', async (req, res) => {
  const nuevoJuego = new Juego(req.body);
  await nuevoJuego.save();
  res.json(nuevoJuego);
});

app.put('/api/juegos/:id', async (req, res) => {
  const actualizado = await Juego.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
});

app.delete('/api/juegos/:id', async (req, res) => {
  await Juego.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Juego eliminado' });
});

app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
