const colorPalette = document.getElementById('colorPalette');
const colorCode = document.getElementById('colorCode');
let selectedColor = '#ffffff';

const colors = [
  "#0000FF", "#000080", "#FF00FF", "#800080", "#F4A460", "#FA8072", "#6495ED", "#D2691E", "#A52A2A", "#DC143C", "#FFDAB9", "#CD853F", "#FFF8DC", "#E9967A", "#48D1CC", "#B22222", "#8B4513", "#556B2F", "#808000", "#BDB76B",
];

colors.forEach(color => {
  const swatch = document.createElement('div');
  swatch.className = 'color-swatch';
  swatch.style.backgroundColor = color;
  swatch.setAttribute('data-color', color);
  colorPalette.appendChild(swatch);
});

colorPalette.addEventListener('click', (event) => {
  const swatch = event.target;
  if (swatch.classList.contains('color-swatch')) {
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
    swatch.classList.add('selected');
    selectedColor = swatch.getAttribute('data-color');
  }
});

document.querySelectorAll('.coloring-zone path').forEach((zone) => {
  zone.addEventListener('click', () => {
    zone.setAttribute('fill', selectedColor);
  });
});
