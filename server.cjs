const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// Initialisation
const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

// Création du dossier "saved" s'il n'existe pas
const savedDir = path.join(__dirname, 'saved');
if (!fs.existsSync(savedDir)) {
    fs.mkdirSync(savedDir, {recursive: true});
    console.log(`Dossier 'saved' créé.`);
}

app.use(bodyParser.json());

// Route to save SVG content
app.post('/save-svg', (req, res) => {
    const {svgContent} = req.body;
    const filePath = path.join(savedDir, 'drawing.svg');
    fs.writeFile(filePath, svgContent, (err) => {
        if (err) {
            console.error('Error saving SVG:', err);
            return res.status(500).send('Error saving SVG');
        }
        res.send('SVG saved successfully');
    });
});

// Routes pour servir les fichiers statiques
app.get('/reset', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'css/reset.css'));
});

app.get('/home', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'css/home.css'));
});

app.get('/stylesheet', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'css/stylesheet.css'));
});

app.get('/script', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'drawings/Java-Script/index.js'));
});

app.get('/save', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'drawings/Java-Script/save-drawing.js'));
});

app.get('/color-palette', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'drawings/Java-Script/color-palette.js'));
});

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/random-drawing', (req, res) => {
        res.setHeader('Content-Type', 'text/html');
        var randomnumber = Math.random();
        if (randomnumber < 0.25) {
            res.sendFile(path.join(__dirname, 'drawings/bateau/bateau.html'));
        } else if (randomnumber < 0.50) {
            res.sendFile(path.join(__dirname, 'drawings/bateau/bateau.html'));
        } else if (randomnumber < 0.75) {
            res.sendFile(path.join(__dirname, 'drawings/bateau/bateau.html'));
        } else {
            res.sendFile(path.join(__dirname, 'drawings/bateau/bateau.html'));
        }
    }
);

// Route 404 par défaut
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Lancement du serveur
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
