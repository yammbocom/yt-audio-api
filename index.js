const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('YT-Audio API is running');
});

app.get('/audio', async (req, res) => {
  const videoId = req.query.id;
  if (!videoId) return res.status(400).send('Missing video ID');

  const url = `https://www.youtube.com/watch?v=${videoId}`;
  try {
    const stream = ytdl(url, {
      filter: 'audioonly',
      quality: 'highestaudio'
    });
    res.setHeader('Content-Type', 'audio/mpeg');
    stream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error streaming audio');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

