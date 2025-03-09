document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('see-my-thought').addEventListener('click', function () {
    const hiddenDiv = document.getElementById('thought');
    hiddenDiv.style.display = hiddenDiv.style.display === 'none' ? 'flex' : 'none';
  });
});


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('see-my-thought').addEventListener('click', function () {
    const hiddenDiv = document.getElementById('bottom-section');
    hiddenDiv.style.display = hiddenDiv.style.display === 'none' ? 'flex' : 'none';
  });
});
