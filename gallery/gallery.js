async function getImages() {
    document.querySelectorAll(".frame").forEach((img) => {
        img.remove();
    });

    const response = await fetch("/images");
    const images = await response.json();
    console.log(images);

    if (images.length > 0) {
        const mostRecentImage = images[0];
        const figure = document.createElement("figure");
        document.body.appendChild(figure);
        const img = document.createElement("img");
        img.className = "frame";
        img.style.width = "300px";
        img.style.height = "200px";
        img.src = "/saved/" + mostRecentImage;
        document.body.appendChild(img);
    }
}

getImages();
setInterval(getImages, 5000);
