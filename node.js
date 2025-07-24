// index.js
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const PORT = 3000;
const FILE = 'data.json';

// Lê os dados salvos
function readData() {
  if (!fs.existsSync(FILE)) return {};
  return JSON.parse(fs.readFileSync(FILE));
}

// Salva os dados no arquivo
function saveData(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// GET dados do jogador
app.get('/player/:userid', (req, res) => {
  const data = readData();
  const userid = req.params.userid;
  const playerData = data[userid] || { Coins: 0 };
  res.json(playerData);
});

// POST/PUT para salvar dados do jogador
app.post('/player/:userid', (req, res) => {
  const data = readData();
  const userid = req.params.userid;
  data[userid] = req.body; // exemplo: { Coins: 50 }
  saveData(data);
  res.json({ status: 'success', saved: data[userid] });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
