const saveButton = document.getElementById('save-btn');
const link = document.createElement("a");
const result = document.getElementById('result');


saveButton.addEventListener('click', (event) => {
  document.querySelectorAll('.coloring-zone svg').forEach((svg) => {
    svg.childNodes.forEach((svgChild) => {
      result.appendChild(svgChild.cloneNode(true));

    })
  })

  console.log(result.outerHTML);

})

