const colorPreview = document.getElementById('colorPreview');
const colorCode = document.getElementById('colorCode');
const saveButton = document.getElementById('save-btn');
const link = document.createElement("a");
const result = document.getElementById('result');
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

saveButton.addEventListener('click', (event) => {
    document.querySelectorAll('.coloring-zone svg').forEach((svg) => {
        svg.childNodes.forEach((svgChild) => {
            result.appendChild(svgChild.cloneNode(true));

        })
    })

    console.log(result.outerHTML);

})
