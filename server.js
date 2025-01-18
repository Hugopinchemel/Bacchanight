// File: server.js

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 8080;
const savedDir = path.join(__dirname, 'saved');
const fontsDir = path.join(__dirname, 'fonts');
const cssDir = path.join(__dirname, 'css');
const imgDir = path.join(__dirname, 'img');
const drawingsDir = path.join(__dirname, 'drawings');
const gamePagesDir = path.join(__dirname, 'Game Pages');
const galleryDir = path.join(__dirname, 'gallery');
const svgDir = path.join(__dirname, 'svg');

// Ensure 'saved' directory exists
if (!fs.existsSync(savedDir)) {
    fs.mkdirSync(savedDir, { recursive: true });
    console.log(`Directory 'saved' created.`);
}

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Static file serving
app.use('/saved', express.static(savedDir));
app.use('/fonts', express.static(fontsDir));

// Utility: Serve static files dynamically
function serveFile(route, filePath, contentType) {
    app.get(route, (req, res) => {
        res.setHeader('Content-Type', contentType);
        res.sendFile(filePath);
        console.log(`User requested ${path.basename(filePath)}`);
    });
}

// CSS files
const cssFiles = [
    'reset-css',
    'gallery-css',
    'font-css',
    'index-css',
    'credits-css',
    'painting-css',
    'letter-css',
    'comparaison-css',
];
cssFiles.forEach(file =>
    serveFile(`/${file}`, path.join(cssDir, `${file}.css`), 'text/css')
);

// Images
const images = [
    'abstractBackground.png',
    'creditsBackground.png',
    'Redon_barque_mystique.png',
    'odiloncomparaison.png',
    'sebastien.png',
    'char.png',
    'mmi-logo.png',
    'musba-logo.png',
];
images.forEach(img =>
    serveFile(`/${path.basename(img, path.extname(img))}`, path.join(imgDir, img), `image/${path.extname(img).slice(1)}`)
);

//bateau SVG files
serveFile('/ciel', path.join(__dirname, 'drawings/bateau/bateau/ciel.svg'), 'image/svg+xml');
serveFile('/bateau.svg', path.join(__dirname, 'drawings/bateau/bateau/ciel.svg'), 'image/svg+xml');
serveFile('/coque.svg', path.join(__dirname, 'drawings/bateau/bateau/coque.svg'), 'image/svg+xml');
serveFile('/interieur.svg', path.join(__dirname, 'drawings/bateau/bateau/interieur.svg'), 'image/svg+xml');
serveFile('/mer.svg', path.join(__dirname, 'drawings/bateau/bateau/mer.svg'), 'image/svg+xml');
serveFile('/voile.svg', path.join(__dirname, 'drawings/bateau/bateau/voile.svg'), 'image/svg+xml');


// SVG Icons and JS files
serveFile('/text-bubble', path.join(__dirname, 'img/text-bubble.svg'), 'image/svg+xml');
serveFile('/odilon', path.join(__dirname, 'img/odilon.svg'), 'image/svg+xml');
serveFile('/alert-icon', path.join(__dirname, 'icons/alert.svg'), 'image/svg+xml');
serveFile('/gallery-js', path.join(galleryDir, 'gallery.js'), 'application/javascript');
serveFile('/save', path.join(drawingsDir, 'Java-Script/save-drawing.js'), 'application/javascript');
serveFile('/thoughts-div', path.join(drawingsDir, 'Java-Script/thoughts-div.js'), 'application/javascript');
serveFile('/color-palette', path.join(drawingsDir, 'Java-Script/color-palette.js'), 'application/javascript');

// HTML pages
const htmlPages = [
    { route: '/', file: 'index.html', dir: __dirname },
    { route: '/credits', file: 'credits.html', dir: __dirname },
    { route: '/gallery', file: 'gallery.html', dir: galleryDir },
    { route: '/bateau', file: 'bateau.html', dir: path.join(drawingsDir, 'bateau') },
    { route: '/letter', file: 'letter.html', dir: gamePagesDir },
    { route: '/comparaison-bateau', file: 'comparaison-bateau.html', dir: gamePagesDir },
    { route: '/comparaison-bridge', file: 'comparaison-bridge.html', dir: gamePagesDir },
    { route: '/comparaison-char', file: 'comparaison-char.html', dir: gamePagesDir },
    { route: '/comparaison-sebastien', file: 'comparaison-sebastien.html', dir: gamePagesDir },
];
htmlPages.forEach(page =>
    serveFile(page.route, path.join(page.dir, page.file), 'text/html')
);

// Save SVG
app.post('/save-svg', (req, res) => {
    const { svgContent } = req.body;
    const date = new Date().toISOString().replace(/[:.]/g, '-');
    const randomName = crypto.randomBytes(16).toString('hex');
    const fileName = `${date}-${randomName}.svg`;
    const filePath = path.join(savedDir, fileName);

    fs.writeFile(filePath, svgContent, err => {
        if (err) {
            console.error('Error saving SVG:', err);
            return res.status(500).send('Error saving SVG');
        }
        res.send('SVG saved successfully');
        console.log(`User saved an SVG file: ${filePath}`);
    });
});

// List saved images
app.get('/images', (req, res) => {
    fs.readdir(savedDir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).send('Internal Server Error');
        }

        const sortedFiles = files
            .filter(file => file.endsWith('.svg'))
            .map(file => ({
                name: file,
                time: fs.statSync(path.join(savedDir, file)).mtime.getTime(),
            }))
            .sort((a, b) => b.time - a.time)
            .map(file => file.name);

        res.json(sortedFiles);
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
