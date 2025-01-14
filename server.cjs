const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sharp = require('sharp');

// Initialisation
const app = express();
const host = 'localhost';
const port = 8080;

// Création du dossier "saved" s'il n'existe pas
const savedDir = path.join(__dirname, 'saved');
if (!fs.existsSync(savedDir)) {
    fs.mkdirSync(savedDir, { recursive: true });
    console.log(`Dossier 'saved' créé.`);
}

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Routes pour servir les fichiers statiques
app.get('/reset', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'reset.css'));
});

app.get('/home.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'home.css'));
});

app.get('/stylesheet', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'stylesheet.css'));
});

app.get('/script', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'index.js'));
});

app.get('/color-palette', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'color-palette.js'));
});

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'accueil.html'));
});

// Sauvegarde des données SVG et conversion en PNG
app.post('/save', (req, res) => {
    const svgData = req.body.svg;

    if (!svgData) {
        res.status(400).json({ message: 'Aucune donnée SVG reçue.' });
        return;
    }

    const fileName = `coloring-${Date.now()}.png`;
    const filePath = path.join(savedDir, fileName);

    sharp(Buffer.from(svgData))
        .png()
        .toFile(filePath, (err) => {
            if (err) {
                console.error('Erreur lors de la conversion :', err);
                res.status(500).json({ message: 'Erreur lors de la conversion.' });
            } else {
                res.json({ message: 'Image sauvegardée avec succès !', fileName });
            }
        });
});

// Route 404 par défaut
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Lancement du serveur
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});