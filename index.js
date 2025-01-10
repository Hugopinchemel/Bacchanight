const colorPreview = document.getElementById('colorPreview');
const colorCode = document.getElementById('colorCode');

colorPalette.addEventListener('click', (event) => {
    const swatch = event.target;
    if (swatch.classList.contains('color-swatch')) {
        const color = swatch.getAttribute('data-color');
        colorPreview.style.backgroundColor = color;
        colorCode.textContent = color;
    }
});