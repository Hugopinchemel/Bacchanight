document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.createElement("canvas");
  canvas.id = "paintCanvas";
  canvas.width = 800;
  canvas.height = 600;
  canvas.style.border = "1px solid black";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const colorPicker = document.createElement("input");
  colorPicker.type = "color";
  colorPicker.id = "colorPicker";
  document.body.appendChild(colorPicker);

  let currentColor = "#000000"; // Default color
  let isDrawing = false;

  // Update current color based on color picker
  colorPicker.addEventListener("input", (e) => {
    currentColor = e.target.value;
  });

  // Start drawing
  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    draw(e);
  });

  // Stop drawing
  canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    ctx.beginPath();
  });

  // Drawing logic
  canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) draw(e);
  });

  function draw(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.fillStyle = currentColor;
    ctx.fillRect(x, y, 10, 10); // Simple square brush
  }
});
