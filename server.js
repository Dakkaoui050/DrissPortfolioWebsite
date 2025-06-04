require('dotenv').config(); // At the very topconst express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const REPO = 'Dakkaoui050/pixel_PartyGame';

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Or limit to your domain
    next();
});

app.get('/commits', async (req, res) => {
    try {
        const response = await fetch(`https://api.github.com/repos/${REPO}/commits`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`
            }
        });

        const data = await response.json();
        res.json(data.slice(0, 5)); // Send latest 5 commits
    } catch (err) {
        res.status(500).send("Error fetching commits");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
