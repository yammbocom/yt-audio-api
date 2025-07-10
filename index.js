const express = require("express");
const { exec } = require("child_process");
const app = express();
const port = process.env.PORT || 3000;

app.get("/audio", (req, res) => {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: "Missing video ID" });

    const command = `yt-dlp -f bestaudio[ext=m4a] -g https://www.youtube.com/watch?v=${id}`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr.trim() || "Error getting audio URL" });
        }
        return res.json({ url: stdout.trim() });
    });
});

app.get("/", (req, res) => {
    res.send("YT Audio API is running.");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});