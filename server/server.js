const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const { evaluateTranscript } = require('./evaluator');
const { transcribeAudio } = require('./transcriber');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.json());

const upload = multer({ dest: path.join(__dirname, 'uploads/') });

app.post('/upload', upload.single('interview'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const transcript = await transcribeAudio(filePath);
    const evaluation = evaluateTranscript(transcript);
    res.json({ transcript, evaluation });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing interview');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});