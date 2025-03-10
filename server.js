const fs = require('fs');
const path = require('path');
const express = require('express');
const crypto = require('crypto');
const fontsDir = path.join(__dirname, 'public/assets/fonts');
const app = express();

const port = process.env.PORT || 5000;


const savedDir = path.join(__dirname, 'saved');
if (fs.existsSync(savedDir)) {
    fs.rmSync(savedDir, {recursive: true, force: true});
    fs.mkdirSync(savedDir);
    console.log(`Dossier 'saved' vidé et recréé.`);
} else {
    fs.mkdirSync(savedDir, {recursive: true});
    console.log(`Dossier 'saved' créé.`);
}

app.use(express.json({ limit: '50mb' }));

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


//   _____                _
//  |  __ \              | |
//  | |__) | ___   _   _ | |_  ___
//  |  _  / / _ \ | | | || __|/ _ \
//  | | \ \| (_) || |_| || |_|  __/
//  |_|  \_\\___/  \__,_| \__|\___|

app.use('/fonts', express.static(fontsDir));

app.get('/favicon.ico', (req, res) => {
    res.setHeader('Content-Type', 'image/x-icon');
    res.sendFile(path.join(__dirname, 'public/assets/logo/logo.ico'));
});


//    _____  _____ _____
//   / ____|/ ____/ ____|
//  | |    | (___| (___
//  | |     \___ \\___ \
//  | |____ ____) |___) |
//   \_____|_____/_____/

app.get('/reset-css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public/css/reset.css'));
});

app.get('/font-css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public/css/font.css'));
});

app.get('/index-css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public/css/index.css'));
});

app.get('/letter-css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public/css/letter.css'));
});

app.get('/credits-css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public/css/credit.css'));
});

app.get('/painting-css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public/css/painting.css'));
});

app.get('/view-drawing-css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public/css/view-drawing.css'));
});


//   _____           _
//  |_   _|         | |
//    | |  _ __   __| | _____  __
//    | | | '_ \ / _` |/ _ \ \/ /
//   _| |_| | | | (_| |  __/>  <
//  |_____|_| |_|\__,_|\___/_/\_\

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'public/pages/index.html'));
});

app.get('/background', (req, res) => {
    res.setHeader('Content-Type', 'text/png');
    res.sendFile(path.join(__dirname, 'public/assets/background/indexBackground.png'));
});

app.get('/mmi-logo', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(path.join(__dirname, 'public/assets/logo/mmi-logo.svg'));
});

app.get('/musba-logo', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(path.join(__dirname, 'public/assets/logo/musba-logo.svg'));
});

app.get('/logo', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(path.join(__dirname, 'public/assets/logo/logo.svg'));
});

app.get('/logo-ico', (req, res) => {
    res.setHeader('Content-Type', 'image/x-icon');
    res.sendFile(path.join(__dirname, 'public/assets/logo/logo.ico'));
});

app.get('/logo-text', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(path.join(__dirname, 'public/assets/logo/logo-text.svg'));
});

//   _____      _       _   _
//  |  __ \    (_)     | | (_)
//  | |__) |_ _ _ _ __ | |_ _ _ __   __ _ ___
//  |  ___/ _` | | '_ \| __| | '_ \ / _` / __|
//  | |  | (_| | | | | | |_| | | | | (_| \__ \
//  |_|   \__,_|_|_| |_|\__|_|_| |_|\__, |___/
//                                   __/ |
//                                  |___/

app.get('/bateau', (req, res) => {
    try {
        let cielPath = path.join(__dirname, 'public/assets/paintings/bateau/ciel.svg');
        let ciel = fs.readFileSync(cielPath).toString();
        let coque = fs.readFileSync(path.join(__dirname, 'public/assets/paintings/bateau/coque.svg')).toString();
        let voile = fs.readFileSync(path.join(__dirname, 'public/assets/paintings/bateau/voile.svg')).toString();
        let mer = fs.readFileSync(path.join(__dirname, 'public/assets/paintings/bateau/mer.svg')).toString();
        let interieur = fs.readFileSync(path.join(__dirname, 'public/assets/paintings/bateau/interieur.svg')).toString();
        let HTML = fs.readFileSync(path.join(__dirname, 'public/pages/painting-boat.html')).toString();
        let compound = ciel + coque + mer + interieur + voile;
        let htmlnothought = HTML.replace("## SVG CODE ##", compound);
        let html = htmlnothought.replace("## TEXT PENSEE ##", "Je rêve d’une mer aussi précieuse que l’émeraude");
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    } catch (err) {
        console.error(`Error reading file: ${err.message}`);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/sebastien', (req, res) => {
    try {
        let arbre = fs.readFileSync(path.join(__dirname, 'public/assets/paintings/mec-pendu/arbre.svg')).toString();
        let ciel = fs.readFileSync(path.join(__dirname, 'public/assets/paintings/mec-pendu/ciel.svg')).toString();
        let ciel2 = fs.readFileSync(path.join(__dirname, 'public/assets/paintings/mec-pendu/ciel2.svg')).toString();
        let ciel3 = fs.readFileSync(path.join(__dirname, 'public/assets/paintings/mec-pendu/ciel3.svg')).toString();
        let ciel4 = fs.readFileSync(path.join(__dirname, 'public/assets/paintings/mec-pendu/ciel4.svg')).toString();
        let nuage = fs.readFileSync(path.join(__dirname, 'public/assets/paintings/mec-pendu/nuage.svg')).toString();
        let sebastien = fs.readFileSync(path.join(__dirname, 'public/assets/paintings/mec-pendu/sebastien.svg')).toString();
        let sol = fs.readFileSync(path.join(__dirname, 'public/assets/paintings/mec-pendu/sol.svg')).toString();
        let HTML = fs.readFileSync(path.join(__dirname, 'public/pages/painting-sebastien.html')).toString();
        let compound = ciel + ciel2 + ciel3 + ciel4 + nuage + sol + arbre + sebastien;
        let htmlnothought = HTML.replace("## SVG CODE ##", compound);
        let html = htmlnothought.replace("## TEXT PENSEE ##", "Je rêve d’une mer aussi précieuse que l’émeraude");
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    } catch (err) {
        console.error(`Error reading file: ${err.message}`);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/color-palette', (req, res) => {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(path.join(__dirname, 'public/script/color-palette.js'));
});

app.get('/odilon', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(path.join(__dirname, 'public/assets/general-assets/odilon.svg'));
});

app.get('/left-thought-bubble', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(path.join(__dirname, 'public/assets/general-assets/left-text-bubble.svg'));
});

app.get('/text-bubble', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(path.join(__dirname, 'public/assets/general-assets/text-bubble.svg'));
});


app.get('/arrow-left', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(path.join(__dirname, 'public/assets/general-assets/arrow-backwards.svg'));
});

app.get('/save-boat', (req, res) => {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(path.join(__dirname, 'public/script/save-drawing-boat.js'));
});

app.get('/save-sebastien', (req, res) => {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(path.join(__dirname, 'public/script/save-drawing-sebastien.js'));
});

app.get('/painting-js', (req, res) => {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(path.join(__dirname, 'public/script/painting.js'));
});

app.get('/barque-mystique', (req, res) => {
    res.setHeader('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, 'public/assets/paintings/Redon_barque_mystique.jpg'));
});

app.get('/saint-sebastien', (req, res) => {
    res.setHeader('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, 'public/assets/paintings/Redon_saint_sebastien.jpg'));
});

app.post('/save-svg-bateau', (req, res) => {
    const {svgContent} = req.body;

    if (!svgContent) {
        console.error('No SVG content provided');
        return res.status(400).send('No SVG content provided');
    }

    const date = new Date();
    const formattedDate = date.toISOString().replace(/[:.]/g, '-');
    const randomName = crypto.randomBytes(16).toString('hex');
    const fileName = `${formattedDate}-${randomName}.svg`;
    const filePath = path.join(savedDir, fileName);

    fs.writeFile(filePath, svgContent, (err) => {
        if (err) {
            console.error('Error saving SVG:', err);
            return res.status(500).send('Error saving SVG');
        }
        // Return JSON with success status and filename
        res.json({success: true, fileName: fileName});
        console.log(`User saved a SVG file: ${filePath}`);
    });
});

app.post('/save-svg-sebastien', (req, res) => {
    const {svgContent} = req.body;

    if (!svgContent) {
        console.error('No SVG content provided');
        return res.status(400).send('No SVG content provided');
    }

    const date = new Date();
    const formattedDate = date.toISOString().replace(/[:.]/g, '-');
    const randomName = crypto.randomBytes(16).toString('hex');
    const fileName = `${formattedDate}-${randomName}.svg`;
    const filePath = path.join(savedDir, fileName);

    fs.writeFile(filePath, svgContent, (err) => {
        if (err) {
            console.error('Error saving SVG:', err);
            return res.status(500).send('Error saving SVG');
        }
        // Return JSON with success status and filename
        res.json({success: true, fileName: fileName});
        console.log(`User saved a Saint Sebastian SVG file: ${filePath}`);
    });
});

// Route pour afficher un dessin sauvegardé
app.get('/view-bateau/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(savedDir, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('Dessin non trouvé');
    }

    const svgContent = fs.readFileSync(filePath, 'utf8');
    const viewTemplate = fs.readFileSync(path.join(__dirname, 'public/pages/view-drawing.html'), 'utf8');

    // Déterminer le type en vérifiant le viewBox/dimensions
    let drawingType = 'boat'; // par défaut
    if (svgContent.includes('viewBox="0 0 1200 1555"')) {
        drawingType = 'sebastien';
    }

    // Image et infos correspondantes
    const compareImage = '/barque-mystique';

    const html = viewTemplate
        .replace('##SVG_CONTENT##', svgContent)
        .replace(/##FILENAME##/g, filename)
        .replace('##DRAWING_TYPE##', drawingType)
        .replace('##COMPARE_IMAGE##', compareImage)
        .replace('##TITLE##', 'La Barque Mystique');

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
});


// Route pour afficher un dessin sauvegardé
app.get('/view-sebastien/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(savedDir, filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('Dessin non trouvé');
    }

    const svgContent = fs.readFileSync(filePath, 'utf8');
    const viewTemplate = fs.readFileSync(path.join(__dirname, 'public/pages/view-drawing.html'), 'utf8');

    // Déterminer le type en vérifiant le viewBox/dimensions
    let drawingType = 'boat'; // par défaut
    if (svgContent.includes('viewBox="0 0 1200 1555"')) {
        drawingType = 'sebastien';
    }

    // Image et infos correspondantes
    const compareImage = '/saint-sebastien';

    const html = viewTemplate
        .replace('##SVG_CONTENT##', svgContent)
        .replace(/##FILENAME##/g, filename)
        .replace('##DRAWING_TYPE##', drawingType)
        .replace('##COMPARE_IMAGE##', compareImage)
        .replace('##TITLE##', "Saint Sébastien");

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
});


//   _______        _
//  |__   __|      | |
//     | | _____  _| |_ _   _ _ __ ___
//     | |/ _ \ \/ / __| | | | '__/ _ \
//     | |  __/>  <| |_| |_| | | |  __/
//     |_|\___/_/\_\\__|\__,_|_|  \___|

app.get('/boat-texture', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(path.join(__dirname, 'public/assets/paintings/bateau/texture.svg'));
});

app.get('/sebastien-texture', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(path.join(__dirname, 'public/assets/paintings/mec-pendu/texture.svg'));
});

//   _          _   _
//  | |        | | | |
//  | |     ___| |_| |_ ___ _ __
//  | |    / _ \ __| __/ _ \ '__|
//  | |___|  __/ |_| ||  __/ |
//  |______\___|\__|\__\___|_|

app.get('/letter', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'public/pages/letter.html'));
});

//   _____              _ _ _
//   / ____|            | (_) |
//  | |     _ __ ___  __| |_| |_ ___
//  | |    | '__/ _ \/ _` | | __/ __|
//  | |____| | |  __/ (_| | | |_\__ \
//   \_____|_|  \___|\__,_|_|\__|___/

app.get('/credits', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'public/pages/credits.html'));
});

app.get('/background-credits', (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(path.join(__dirname, 'public/assets/background/creditsBackground.png'));
});


let server = app.listen(port, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('App listening at https://%s:%s', host, port)
});
