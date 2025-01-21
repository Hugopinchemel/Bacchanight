const saveButton = document.getElementById('save-btn');
const svgContainer = document.querySelector('.coloring-zone'); // The div containing the SVG

async function saveSvgToServer(svgContent) {
    await fetch('/save-svg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ svgContent })
    });
}

function getViewBox(svgElement) {
    return svgElement.getAttribute('viewBox');
}

saveButton.addEventListener('click', async () => {
    const result = document.getElementById('result');
    result.innerHTML = ''; // Clear previous result
    const svgElements = svgContainer.querySelectorAll('svg');
    let viewBox = '';

    svgElements.forEach((svg) => {
        if (!viewBox) {
            viewBox = getViewBox(svg);
        }
        svg.childNodes.forEach((svgChild) => {
            result.appendChild(svgChild.cloneNode(true));
        });
    });

    const svgContent = `<svg viewBox="${viewBox}">${result.innerHTML}</svg>`;

    // Save SVG to the server
    await saveSvgToServer(svgContent);

    // Optionally, download SVG to the device
    downloadSvgToDevice(svgContent);

    // Add the image on top
    const img = document.createElement('img');
    img.alt = '';
    img.className = 'texture';
    img.src = '/boat-texture';
    svgContainer.appendChild(img);
});

function downloadSvgToDevice(svgContent) {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'drawing.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}