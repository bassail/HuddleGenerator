// Logique principale de l'application

// Références aux éléments du DOM
const generateBtn = document.getElementById('generate-btn');
const speechText = document.getElementById('speech-text');

// Fonction pour sélectionner N phrases aléatoires d'un tableau
function getRandomPhrases(phraseArray, count) {
    const shuffled = [...phraseArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Fonction pour générer 6 phrases aléatoires (2 de chaque catégorie)
function generateSpeech() {
    // Sélectionner 2 phrases uniques pour chaque catégorie, sans doublon global
    let usedPhrases = new Set();

    function getUniqueRandomPhrases(sourceArray, count, usedSet) {
        const available = sourceArray.filter(p => !usedSet.has(p));
        const selected = getRandomPhrases(available, Math.min(count, available.length));
        selected.forEach(p => usedSet.add(p));
        return selected;
    }

    const sportSelected = getUniqueRandomPhrases(sportPhrases, 2, usedPhrases);
    const spiritSelected = getUniqueRandomPhrases(spiritPhrases, 2, usedPhrases);
    const thanksSelected = getUniqueRandomPhrases(thanksPhrases, 2, usedPhrases);

    // Si on a moins de 6 phrases, compléter avec d'autres phrases non utilisées
    let allSelected = [...sportSelected, ...spiritSelected, ...thanksSelected];
    if (allSelected.length < 6) {
        const allPhrases = Array.from(new Set([
            ...sportPhrases,
            ...spiritPhrases,
            ...thanksPhrases
        ]));
        for (let phrase of allPhrases) {
            if (!usedPhrases.has(phrase)) {
                allSelected.push(phrase);
                usedPhrases.add(phrase);
                if (allSelected.length === 6) break;
            }
        }
    }

    // Créer le texte du discours avec titres, sans section "Autres"
    let speechContent = '';
    // Groupe Sportif
    speechContent += '<strong>Sportif</strong><br>';
    speechContent += sportSelected.map((phrase) => `${phrase}`).join('<br><br>');
    speechContent += '<br><br>';
    // Groupe Spirit
    speechContent += '<strong>Spirit</strong><br>';
    speechContent += spiritSelected.map((phrase) => `${phrase}`).join('<br><br>');
    speechContent += '<br><br>';
    // Groupe Remerciements
    speechContent += '<strong>Remerciements</strong><br>';
    speechContent += thanksSelected.map((phrase) => `${phrase}`).join('<br><br>');


    // Afficher le discours avec animation
    speechText.innerHTML = speechContent;

    // Ajouter une animation de fade-in
    speechText.style.animation = 'none';
    setTimeout(() => {
        speechText.style.animation = 'fadeInText 0.6s ease-in';
    }, 10);
}

// Ajouter l'événement au bouton
generateBtn.addEventListener('click', generateSpeech);

// Générer un discours au chargement de la page
window.addEventListener('load', generateSpeech);

