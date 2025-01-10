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

document.querySelectorAll('.coloring-zone path').forEach((zone, index) => {
    console.log(zone);
    zone.addEventListener('click', () => {
        console.log(zone);

        zone.setAttribute('fill', selectedColor);
    });
});