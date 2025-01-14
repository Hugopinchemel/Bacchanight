const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

const savedDir = path.join(__dirname, 'saved');
if (!fs.existsSync(savedDir)) {
    fs.mkdirSync(savedDir, {recursive: true});
    console.log(`Dossier 'saved' créé.`);
}

app.use(bodyParser.json());

<<<<<<< Updated upstream

//   _____                _
//  |  __ \              | |
//  | |__) | ___   _   _ | |_  ___
//  |  _  / / _ \ | | | || __|/ _ \
//  | | \ \| (_) || |_| || |_|  __/
//  |_|  \_\\___/  \__,_| \__|\___|



=======
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Route to save SVG content
>>>>>>> Stashed changes
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


//    _____                                  _____  _                _    _
//   / ____|                                / ____|| |              | |  (_)
//  | (___    ___  _ __ __   __ ___  _ __  | (___  | |_  __ _  _ __ | |_  _  _ __    __ _
//   \___ \  / _ \| '__|\ \ / // _ \| '__|  \___ \ | __|/ _` || '__|| __|| || '_ \  / _` |
//   ____) ||  __/| |    \ V /|  __/| |     ____) || |_| (_| || |   | |_ | || | | || (_| |
//  |_____/  \___||_|     \_/  \___||_|    |_____/  \__|\__,_||_|    \__||_||_| |_| \__, |
//                                                                                   __/ |
//                                                                                  |___/


app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
