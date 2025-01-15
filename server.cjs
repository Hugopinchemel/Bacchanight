const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');


const app = express();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

const savedDir = path.join(__dirname, 'saved');
if (!fs.existsSync(savedDir)) {
    fs.mkdirSync(savedDir, {recursive: true});
    console.log(`Dossier 'saved' créé.`);
}

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(bodyParser.json());


//   _____                _
//  |  __ \              | |
//  | |__) | ___   _   _ | |_  ___
//  |  _  / / _ \ | | | || __|/ _ \
//  | | \ \| (_) || |_| || |_|  __/
//  |_|  \_\\___/  \__,_| \__|\___|


app.post('/save-svg', (req, res) => {
    const {svgContent} = req.body;
    const randomName = crypto.randomBytes(16).toString('hex');
    const filePath = path.join(savedDir, `${randomName}.svg`);
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
    console.log('User requested reset.css');
});

app.get('/index', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'css/index.css'));
    console.log('User requested index.css');
});

app.get('/validation', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'css/validation.css'));
    console.log('User requested validation.css');
});

app.get('/fin', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'css/fin.css'));
    console.log('User requested fin.css');
});

app.get('/stylesheet', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'css/stylesheet.css'));
    console.log('User requested stylesheet.css');
});

app.get('/script', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'drawings/Java-Script/index.js'));
    console.log('User requested index.js');
});

app.get('/save', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'drawings/Java-Script/save-drawing.js'));
    console.log('User requested save-drawing.js');
});

app.get('/color-palette', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'drawings/Java-Script/color-palette.js'));
    console.log('User requested color-palette.js');
});

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'index.html'));
    console.log('User requested index.html');
});

app.get('/background-index', (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(path.join(__dirname, 'img/abstractBackground.png'));
    console.log('User requested abstractBackground.png');
});


app.get('/random-drawing', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    var randomnumber = Math.random();
    if (randomnumber < 0.25) {
        res.sendFile(path.join(__dirname, 'drawings/bateau/bateau.html'));
    } else if (randomnumber < 0.50) {
        res.sendFile(path.join(__dirname, 'drawings/tableau-2/tableau-2.html'));
    } else if (randomnumber < 0.75) {
        res.sendFile(path.join(__dirname, 'drawings/tableau-3/tableau-3.html'));
    } else {
        res.sendFile(path.join(__dirname, 'drawings/tableau-4/tableau-4.html'));
    }
});

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
