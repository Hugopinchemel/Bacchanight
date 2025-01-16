const saveSection = get.getElementsByClassName('save-section');

validateButton.addEventListener('click', async => {
  const button = document.createElement("button");
  button.className = "validate-button";
  button.content = "Valider le tableau";
});

saveButton.addEventListener('click', async => {
  const button = document.createElement("button");
  button.className = "save-button";
  button.content = "Sauvegarder le tableau";
});

saveButton.addEventListener('click', async => {
  const button = document.createElement("button");
  button.className = "download-button";
  button.content = "telecharger le tableau";
});
