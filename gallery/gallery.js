async function getImages() {
  // Remove existing images
  document.querySelectorAll(".frame").forEach((img) => {
    img.remove();
  });

  // Fetch new images
  const response = await fetch("/images");
  const images = await response.json();
  console.log(images);

  // Append new images
  images.forEach((image) => {
    const figure = document.createElement("figure");
    document.body.appendChild(figure);
    const img = document.createElement("img");
    img.className = "frame";
    img.width = 150;
    img.height = 115.5;
    img.src = "/saved/" + image;
    document.body.appendChild(img);
  });
}

getImages();
setInterval(getImages, 5000000000000000000);
