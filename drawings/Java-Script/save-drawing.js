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


saveButton.addEventListener('click', async () => {
  result.innerHTML = '';
  document.querySelectorAll('.coloring-zone svg').forEach((svg) => {
    svg.childNodes.forEach((svgChild) => {
      result.appendChild(svgChild.cloneNode(true));
    });
  });

  // Append the texture image to the result
  const textureImg = document.querySelector('img.texture');
  if (textureImg) {
    const imgClone = textureImg.cloneNode(true);
    result.appendChild(imgClone);
  }

  result.removeAttribute('viewBox');
  result.setAttribute('viewBox', '0 0 3120 2400');
  result.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  result.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

  const svgContent = result.outerHTML;

  // Save SVG to the server
  await saveSvgToServer(svgContent);
  location.href='/save-svg'

});