const saveButton = document.getElementById('save-btn');
const link = document.createElement("a");
const result = document.getElementById('result');

async function saveSvgToServer(svgContent) {
    await fetch('/save-svg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({svgContent})
    });
}

function downloadSvgToDevice(svgContent) {
    const blob = new Blob([svgContent], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = 'drawing.svg';
    link.click();

    URL.revokeObjectURL(url); // Clean up the URL object
}

saveButton.addEventListener('click', async () => {
    result.innerHTML = ''; // Clear previous result
    document.querySelectorAll('.coloring-zones-container svg').forEach((svg) => {
        svg.childNodes.forEach((svgChild) => {
            result.appendChild(svgChild.cloneNode(true));
        });
    });

    const svgContent = result.outerHTML;

    // Save SVG to the server
    await saveSvgToServer(svgContent);
});
