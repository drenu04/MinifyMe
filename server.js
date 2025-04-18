const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

let urlDatabase = {}; // To store short URL mappings

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the homepage (url_shortener.html) when accessing the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'url_shortener.html')); // Reference to url_shortener.html
});

// Route to handle the form submission for URL shortening
app.post('/shorten', (req, res) => {
    const longUrl = req.body.longUrl;
    const customShort = req.body.shortUrl;
    const shortUrl = customShort || Math.random().toString(36).substring(2, 8);

    // Save the URL mapping
    urlDatabase[shortUrl] = longUrl;

    res.send(`Shortened URL: <a href="/${shortUrl}" target="_blank">/${shortUrl}</a>`);
});

// Route to handle redirection for shortened URL
app.get('/:shortUrl', (req, res) => {
    const shortUrl = req.params.shortUrl;
    const longUrl = urlDatabase[shortUrl];
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.send('URL not found!');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});