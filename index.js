const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('API YT-Audio funcionando 🚀');
});

app.get('/audio', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).send('Missing video ID');

  const ytdl = require('ytdl-core');
  try {
    const info = await ytdl.getInfo(id);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
    res.redirect(format.url);
  } catch (err) {
    res.status(500).send('Error al procesar el video');
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
