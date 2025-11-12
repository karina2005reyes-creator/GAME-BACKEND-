// Importar dependencias
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

// Crear app Express
const app = express();
const PORT = 3000;

// Middleware para manejar datos del body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Conexión a MongoDB Atlas
mongoose.connect(
  'mongodb+srv://karina2005reyes_db_user:6eHZL97SyZ0WdzI0@game.t1iu0ms.mongodb.net/?appName=GAME',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Ruta principal: muestra el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta de ejemplo para probar conexión
app.get('/api/test', (req, res) => {
  res.json({ mensaje: 'Servidor funcionando correctamente 🚀' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});