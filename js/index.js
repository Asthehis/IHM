'use strict'

document.getElementById('main_button').addEventListener('click', isFile);
    
    
function isFile() {
    const fileInput = document.getElementById('file_input');
    const errorDiv = document.getElementById('file_error');
    if (!fileInput.files || fileInput.files.length === 0) {
        errorDiv.textContent = "Veuillez sélectionner un fichier .mp3 avant de lancer l'écoute.";
        errorDiv.style.display = "block";
    } else {
        errorDiv.style.display = "none";
        window.location.href = "listening.html";
    }
}
