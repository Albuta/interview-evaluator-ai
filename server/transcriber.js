require('dotenv').config();
const fs = require('fs');

async function transcribeAudio(filePath) {
  const file = fs.createReadStream(filePath);

  // Simulate a transcription for testing
  const transcript = "Hello, my name is John. I have 5 years of experience in customer support and enjoy solving problems.";

  return transcript;
}

module.exports = { transcribeAudio };
