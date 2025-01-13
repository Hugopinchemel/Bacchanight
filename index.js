const colorPreview = document.getElementById('colorPreview');
const colorCode = document.getElementById('colorCode');
let selectedColor = '#ffffff';

colorPalette.addEventListener('click', (event) => {
    const swatch = event.target;
    if (swatch.classList.contains('color-swatch')) {
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
        selectedColor = swatch.getAttribute('data-color');
        colorPreview.style.backgroundColor = selectedColor;
        colorCode.textContent = selectedColor;
    }
});

document.querySelectorAll('.coloring-zone path').forEach((zone) => {
    zone.addEventListener('click', () => {
        zone.setAttribute('fill', selectedColor);
    });
});

function mergeSVGsWithZIndex() {
    const coloringZones = document.querySelectorAll('.coloring-zone svg');
    if (coloringZones.length === 0) {
        console.error('Aucun élément SVG trouvé avec la classe .coloring-zone');
        return null;
    }

    const svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    // Global attributes for the parent container
    svgContainer.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgContainer.setAttribute('viewBox', '0 0 1200 927');
    svgContainer.setAttribute('width', '1200');
    svgContainer.setAttribute('height', '927');

    // Collect all paths with their z-index
    const pathsWithZIndex = [];
    coloringZones.forEach((zone) => {
        const paths = Array.from(zone.querySelectorAll('path'));
        paths.forEach((path) => {
            const zIndex = window.getComputedStyle(path).zIndex || 0;
            pathsWithZIndex.push({ path: path.cloneNode(true), zIndex: parseInt(zIndex, 10) });
        });
    });

    if (pathsWithZIndex.length === 0) {
        console.error('Aucun chemin SVG trouvé dans les éléments .coloring-zone');
        return null;
    }

    // Sort paths by z-index
    pathsWithZIndex.sort((a, b) => a.zIndex - b.zIndex);

    // Append paths to the container in the correct order
    pathsWithZIndex.forEach(({ path }) => {
        svgContainer.appendChild(path);
    });

    // Add the texture if it exists
    const textureElement = document.querySelector('.texture-picture svg');
    if (textureElement) {
        const clonedTexture = textureElement.cloneNode(true);
        svgContainer.appendChild(clonedTexture); // The texture will be added on top
    } else {
        console.warn('Aucun élément trouvé avec la classe .texture-picture');
    }

    return svgContainer;
}

// Server-side save
document.getElementById('save').addEventListener('click', () => {
    const svgContainer = mergeSVGsWithZIndex();
    if (!svgContainer) return;

    const svgData = new XMLSerializer().serializeToString(svgContainer);

    fetch('/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ svg: svgData }),
    })
        .then((response) => response.json())
        .then((data) => alert(`Image saved successfully: ${data.fileName}`))
        .catch((error) => console.error('Error:', error));
});

// Local download
document.getElementById('download').addEventListener('click', () => {
    const svgContainer = mergeSVGsWithZIndex();
    if (!svgContainer) return;

    const svgData = new XMLSerializer().serializeToString(svgContainer);

    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'coloring_with_texture.svg';
    link.click();
});