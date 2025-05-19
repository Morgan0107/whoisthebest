const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;
const SCORES_FILE = './data/scores.json';

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let scores = { "노무현": 0, '이명박': 0, '박근혜': 0, '문재인': 0, '윤석열': 0 };

if (fs.existsSync(SCORES_FILE)) {
  scores = JSON.parse(fs.readFileSync(SCORES_FILE));
}

app.post('/vote', (req, res) => {
  const { player } = req.body;
  if (scores[player] !== undefined) {
    scores[player]++;
    fs.writeFileSync(SCORES_FILE, JSON.stringify(scores));
    res.json({ score: scores[player] });
  } else {
    res.status(400).json({ error: 'Invalid player' });
  }
});

app.get('/scores', (req, res) => {
  res.json(scores);
});

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});