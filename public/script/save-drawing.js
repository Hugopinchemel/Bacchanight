const saveButton = document.getElementById('save-btn');
const result = document.createElement('svg');

async function saveSvgToServer(svgContent) {
  try {
    const response = await fetch('/save-svg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({svgContent})
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving SVG:', error);
    return null;
  }
}

saveButton.addEventListener('click', async () => {
  result.innerHTML = '';

  const svgElements = document.querySelectorAll('.painting-area svg');
  svgElements.forEach((svg) => {
    svg.childNodes.forEach((child) => {
      result.appendChild(child.cloneNode(true));
    });
  });

  result.setAttribute('viewBox', '0 0 3120 2400');
  result.setAttribute('width', '3120');
  result.setAttribute('height', '2400');
  result.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  result.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  result.setAttribute('blur', '1px');

  const textureImg = document.querySelector('img.texture');
  if (textureImg) {
    const svgImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    svgImage.setAttribute('href', textureImg.src);
    svgImage.setAttribute('width', '3120');
    svgImage.setAttribute('height', '2400');
    svgImage.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    result.appendChild(svgImage);
  }

  const svgContent = result.outerHTML;

  const data = await saveSvgToServer(svgContent);
  if (data && data.success && data.fileName) {
    window.location.href = `/view/${data.fileName}`;
  } else {
    console.error('Failed to save drawing');
  }
});
