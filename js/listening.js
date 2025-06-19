'use strict'

show();

async function show() {
    // --- CONFIG ---
    const txtUrl = 'data/transcription.txt'; // Chemin vers ton fichier txt
    const keywords = ['douleur', 'thoracique', 'oppression', 'irradiation', 'nausée', 'vomissement', 'dyspnée', 'palpitation', 'syncope', 'sueurs']; // Exemples SCA

    // --- Chargement du texte ---
    let txt = '';
    try {
        const resp = await fetch(txtUrl);
        txt = await resp.text();
    } catch (e) {
        txt = "Erreur lors du chargement du fichier.";
    }

    // --- Affichage progressif ---
    const transcriptionEl = document.getElementById('transcription');
    let idx = 0;
    let detected = new Set();
    function showNextChar() {
        if (idx < txt.length) {
            transcriptionEl.textContent += txt[idx];
            // Détection mots-clés à chaque mot
            if (txt[idx] === ' ' || txt[idx] === '\n' || idx === txt.length-1) {
                const currentText = transcriptionEl.textContent.toLowerCase();
                keywords.forEach(kw => {
                    if (currentText.includes(kw.toLowerCase())) detected.add(kw);
                });
                updateKeywordsTable();
            }
            idx++;
            setTimeout(showNextChar, 20); // Vitesse d'affichage
        } else {
            // Après affichage complet, lancer la prédiction
            showPrediction();
        }
    }

    // --- Tableau mots-clés ---
    function updateKeywordsTable() {
        const tbody = document.querySelector('#keywords-table tbody');
        tbody.innerHTML = '';
        keywords.forEach(kw => {
            const detectedNow = detected.has(kw);
            tbody.innerHTML += `
                <tr style="background:${detectedNow ? '#b3e5fc' : 'transparent'};">
                    <td>${kw}</td>
                    <td style="text-align:center;">${detectedNow ? '✔️' : ''}</td>
                </tr>
            `;
        });
    }

    // --- Prédiction ---
    function showPrediction() {
        document.getElementById('prediction-loader').style.display = 'block';
        setTimeout(() => {
            document.getElementById('prediction-loader').style.display = 'none';
            document.getElementById('prediction-result').style.display = 'block';
            document.getElementById('prediction-result').textContent = "Syndrome coronarien aigu probable";
        }, 2500); // Simule un délai de calcul
    }

    // Initialisation
    updateKeywordsTable();
    showNextChar();
}