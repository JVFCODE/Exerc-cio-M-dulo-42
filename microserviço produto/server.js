const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost/clientes', { useNewUrlParser: true, useUnifiedTopology: true });

// Modelo
const ClienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefone: { type: String, required: true }
});

const Cliente = mongoose.model('Cliente', ClienteSchema);

// Endpoints de Clientes
app.post('/clientes', async (req, res) => {
  const cliente = new Cliente(req.body);
  await cliente.save();
  res.status(201).send(cliente);
});

app.get('/clientes/:id', async (req, res) => {
  const cliente = await Cliente.findById(req.params.id);
  if (!cliente) return res.status(404).send();
  res.send(cliente);
});

app.put('/clientes/:id', async (req, res) => {
  const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!cliente) return res.status(404).send();
  res.send(cliente);
});

// Iniciar o servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Microserviço de Clientes rodando na porta ${PORT}`);
});
