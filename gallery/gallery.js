async function getImages() {
  const reponse = await fetch("/images");
  const images = await reponse.json();
  console.log(images);

  images.forEach((image)=>{
    const img = document.createElement("img");
    img.id = "gallery";
    img.src = "/saved/" + image;
    document.body.appendChild(img);
  })
}

setInterval(getImages, 5000);


