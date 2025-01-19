const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fontsDir = path.join(__dirname, 'fonts');


const app = express();


//   _   _____  ______ __  __  ______      ________   ____  ______ ______ ____  _____  ______   _    _  _____ ______   _
//  | | |  __ \|  ____|  \/  |/ __ \ \    / /  ____| |  _ \|  ____|  ____/ __ \|  __ \|  ____| | |  | |/ ____|  ____| | |
//  | | | |__) | |__  | \  / | |  | \ \  / /| |__    | |_) | |__  | |__ | |  | | |__) | |__    | |  | | (___ | |__    | |
//  | | |  _  /|  __| | |\/| | |  | |\ \/ / |  __|   |  _ <|  __| |  __|| |  | |  _  /|  __|   | |  | |\___ \|  __|   | |
//  |_| | | \ \| |____| |  | | |__| | \  /  | |____  | |_) | |____| |   | |__| | | \ \| |____  | |__| |____) | |____  |_|
//  (_) |_|  \_\______|_|  |_|\____/   \/   |______| |____/|______|_|    \____/|_|  \_\______|  \____/|_____/|______| (_)

// const host = process.env.HOST || 'localhost';


const port = process.env.PORT || 8081;

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


//    _____  _____ _____
//   / ____|/ ____/ ____|
//  | |    | (___| (___
//  | |     \___ \\___ \
//  | |____ ____) |___) |
//   \_____|_____/_____/
//
//


app.get('/reset-css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'css/reset-css.css'));
    console.log('User requested reset-css.css');
});

app.get('gallery-css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'css/gallery-css.css'));
    console.log('User requested gallery-css.css');
});

app.get('/font-css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'css/font-css.css'));
    console.log('User requested font-css.css');
});

app.get('/index-css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'css/index-css.css'));
    console.log('User requested index-css.css');
});

app.get('/credits-css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'css/credits-css.css'));
    console.log('User requested credits-css.css');
});

app.get('/painting-css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'css/painting-css.css'));
    console.log('User requested painting.css');
});

app.get('/letter-css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'css/letter-css.css'));
    console.log('User requested letter.css');
});

app.get('/comparaison-css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'css/comparaison-css.css'));
    console.log('User requested letter.css');
});


//   _____           _
//  |_   _|         | |
//    | |  _ __   __| | _____  __
//    | | | '_ \ / _` |/ _ \ \/ /
//   _| |_| | | | (_| |  __/>  <
//  |_____|_| |_|\__,_|\___/_/\_\


app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'index.html'));
    console.log('User requested index.html');
});

app.get('/background', (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(path.join(__dirname, 'img/abstractBackground.png'));
    console.log('User requested abstractBackground.png');
});

app.get('/background-credits', (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(path.join(__dirname, 'img/creditsBackground.png'));
    console.log('User requested abstractBackground.png');
});

app.get('/gallery-css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'css/gallery-css.css'));
    console.log('User requested gallery-css.css');
});


//   _____      _       _   _
//  |  __ \    (_)     | | (_)
//  | |__) |_ _ _ _ __ | |_ _ _ __   __ _ ___
//  |  ___/ _` | | '_ \| __| | '_ \ / _` / __|
//  | |  | (_| | | | | | |_| | | | | (_| \__ \
//  |_|   \__,_|_|_| |_|\__|_|_| |_|\__, |___/
//                                   __/ |
//                                  |___/



app.get('/images', (req, res) => {
    fs.readdir(savedDir, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory');
        }
        const sortedFiles = files
            .map(file => ({
                name: file,
                time: fs.statSync(path.join(savedDir, file)).mtime.getTime()
            }))
            .sort((a, b) => b.time - a.time)
            .map(file => file.name);
        res.json(sortedFiles);
    });
});


//saving function
app.post('/save-svg', (req, res) => {
    const {svgContent} = req.body;
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
        res.send('SVG saved successfully');
        console.log(`User saved a SVG file: ${filePath}`);
    });
});

//route for color-palette.js
app.get('/save', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'drawings/Java-Script/save-drawing.js'));
    console.log('User requested save-drawing.js');
});

//route for color-palette.js
app.get('/color-palette', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'drawings/Java-Script/color-palette.js'));
    console.log('User requested color-palette.js');
});

app.get('/char-picture', (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(path.join(__dirname, 'drawings/char/OdilonRedon-The_Chariot_of_Apollo.png'));
    console.log('User requested OdilonRedon-The_Chariot_of_Apollo.png');
});

let ciel = fs.readFileSync('drawings/bateau/bateau/ciel.svg').toString();
let coque = fs.readFileSync('drawings/bateau/bateau/coque.svg').toString();
let voile = fs.readFileSync('drawings/bateau/bateau/voile.svg').toString();
let mer = fs.readFileSync('drawings/bateau/bateau/mer.svg').toString();
let interieur = fs.readFileSync('drawings/bateau/bateau/interieur.svg').toString();
let HTMLbateau = fs.readFileSync('drawings/bateau/bateau.html').toString();
let compound = ciel + coque + voile + mer + interieur;
htmlbateau = HTMLbateau.replace("## SVG CODE ##", compound);
console.log(htmlbateau);

app.get('/bateau', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlbateau);
    console.log('User requested bateau.html');
 });



//    _____              _ _ _
//   / ____|            | (_) |
//  | |     _ __ ___  __| |_| |_ ___
//  | |    | '__/ _ \/ _` | | __/ __|
//  | |____| | |  __/ (_| | | |_\__ \
//   \_____|_|  \___|\__,_|_|\__|___/
//
//
app.get('/credits', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'credits.html'));
    console.log('User requested credits.html');
});

app.get('/mmi-logo', (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(path.join(__dirname, 'img/mmi-logo.png'));
    console.log('User requested mmi-logo.png');
});

app.get('/musba-logo', (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(path.join(__dirname, 'img/musba-logo.png'));
    console.log('User requested musba-logo.png');
});

app.get('/logo', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(path.join(__dirname, 'img/logo.svg'));
    console.log('User requested logo.svg');
});

//    _____       _ _
//   / ____|     | | |
//  | |  __  __ _| | | ___ _ __ _   _
//  | | |_ |/ _` | | |/ _ \ '__| | | |
//  | |__| | (_| | | |  __/ |  | |_| |
//   \_____|\__,_|_|_|\___|_|   \__, |
//                               __/ |
//                              |___/


app.get('/gallery', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'gallery/gallery.html'));
    console.log('User requested gallery.html');
});

app.get('/images', (req, res) => {
    const savedDir = path.join(__dirname, 'saved');

    fs.readdir(savedDir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Build the HTML with SVG <img> tags
        let galleryHTML = files.filter(file => file.endsWith('.svg'));
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(galleryHTML));
    });
});

// Serve files in the "saved" directory statically
app.use('/saved', express.static(savedDir));

app.get('/gallery-js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'gallery/gallery.js'));
    console.log('User requested gallery.js');
});


//   _          _   _
//  | |        | | | |
//  | |     ___| |_| |_ ___ _ __
//  | |    / _ \ __| __/ _ \ '__|
//  | |___|  __/ |_| ||  __/ |
//  |______\___|\__|\__\___|_|


app.get('/letter', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'Game Pages/letter.html'));
    console.log('User requested letter.html');
});

//    _____                                      _
//   / ____|                                    (_)
//  | |     ___  _ __ ___  _ __   __ _ _ __ __ _ _ ___  ___  _ __
//  | |    / _ \| '_ ` _ \| '_ \ / _` | '__/ _` | / __|/ _ \| '_ \
//  | |___| (_) | | | | | | |_) | (_| | | | (_| | \__ \ (_) | | | |
//   \_____\___/|_| |_| |_| .__/ \__,_|_|  \__,_|_|___/\___/|_| |_|
//                        | |
//                        |_|

app.get('/comparaison-bateau', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'Game Pages/comparaison-bateau.html'));
    console.log('User requested comparaison.html');
});

app.get('/comparaison-bridge', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'Game Pages/comparaison-bridge.html'));
    console.log('User requested comparaison-bridge.html');
});

app.get('/comparaison-char', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'Game Pages/comparaison-char.html'));
    console.log('User requested comparaison-char.html');
});

app.get('/comparaison-sebastien', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'Game Pages/comparaison-sebastien.html'));
    console.log('User requested comparaison-sebastien.html');
});

app.get('/Redon_barque_mystique', (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(path.join(__dirname, 'img/Redon_barque_mystique.png'));
    console.log('User requested Redon_barque_mystique.png');
});

app.get('/odiloncomparaison', (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(path.join(__dirname, 'img/odiloncomparaison.png'));
    console.log('User requested odiloncomparaison.png');
});

app.get('/sebastien', (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(path.join(__dirname, 'img/sebastien.png'));
    console.log('User requested sebastien.png');
});

app.get('/char', (req, res) => {
    res.setHeader('Content-Type', 'image/png');
    res.sendFile(path.join(__dirname, 'img/char.png'));
    console.log('User requested char.png');
});


//   ______          _
//  |  ____|        | |
//  | |__ ___  _ __ | |_ ___
//  |  __/ _ \| '_ \| __/ __|
//  | | | (_) | | | | |_\__ \
//  |_|  \___/|_| |_|\__|___/


app.use('/fonts', express.static(fontsDir));


//   _  _    ___  _  _     ______
//  | || |  / _ \| || |   |  ____|
//  | || |_| | | | || |_  | |__   _ __ _ __ ___  _ __
//  |__   _| | | |__   _| |  __| | '__| '__/ _ \| '__|
//     | | | |_| |  | |   | |____| |  | | | (_) | |
//     |_|  \___/   |_|   |______|_|  |_|  \___/|_|


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


// app.listen(port, host, () => {
//   console.log(`Server running at http://${host}:${port}/`);
// });


//   _    _____         _ _       _       _                 _                    _ _     _              _     _
//  | |  / ____|       (_) |     | |     | |               | |                  | (_)   | |            | |   | |
//  | | | (_____      ___| |_ ___| |__   | | ___   ___ __ _| |   ___  _ __    __| |_ ___| |_ __ _ _ __ | |_  | |
//  | |  \___ \ \ /\ / / | __/ __| '_ \  | |/ _ \ / __/ _` | |  / _ \| '__|  / _` | / __| __/ _` | '_ \| __| | |
//  |_|  ____) \ V  V /| | || (__| | | | | | (_) | (_| (_| | | | (_) | |    | (_| | \__ \ || (_| | | | | |_  |_|
//  (_) |_____/ \_/\_/ |_|\__\___|_| |_| |_|\___/ \___\__,_|_|  \___/|_|     \__,_|_|___/\__\__,_|_| |_|\__| (_)
//
//


var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('App listening at https://%s:%s', host, port)
});