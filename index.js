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

document.getElementById('save-btn').addEventListener('click', () => {
    const element = document.getElementById('capture-area');
    html2canvas(element).then(canvas => {
        // Convert canvas to a downloadable link
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'capture.png';
        link.click();
    });
});