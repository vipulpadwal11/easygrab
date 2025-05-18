const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Download endpoint
app.post('/api/download', async (req, res) => {
  const { url, format } = req.body;
  if (!url) return res.status(400).json({ error: 'No URL provided' });

  // Decide file extension
  const ext = format === 'audio' ? 'mp3' : 'mp4';
  const filename = `easygrab_${Date.now()}.${ext}`;
  const outputPath = path.join(__dirname, filename);

  // Build yt-dlp command
  let cmd = `yt-dlp -o "${outputPath}" `;
  if (format === 'audio') cmd += '-x --audio-format mp3 ';
  cmd += `"${url}"`;

  exec(cmd, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Download failed' });
    }
    res.download(outputPath, filename, (err) => {
      fs.unlink(outputPath, () => {}); // Delete file after sending
    });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`EasyGrab backend running on port ${PORT}`));
