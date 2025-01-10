const colorPreview = document.getElementById('colorPreview');
const colorCode = document.getElementById('colorCode');
let selectedColor = '#000';

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

document.querySelectorAll('.coloring-zone').forEach(zone => {
    zone.addEventListener('click', () => {
        zone.style.backgroundColor = selectedColor;
    });
});