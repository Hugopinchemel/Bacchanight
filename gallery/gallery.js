async function getImages() {
    document.querySelectorAll(".frame").forEach((img) => {
        img.remove();
    });

    const response = await fetch("/images");
    const images = await response.json();
    console.log(images);

    images.forEach((image) => {
        const figure = document.createElement("figure");
        document.body.appendChild(figure);
        const img = document.createElement("img");
        img.className = "frame";
        img.style.width = "300px";
        img.style.height = "200px";
        img.src = "/saved/" + image;
        document.body.appendChild(img);
    });
}

getImages().then(r => console.log("Initial images fetched"));
setInterval(getImages, 5000);
