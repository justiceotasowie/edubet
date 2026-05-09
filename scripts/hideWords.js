import { sentences } from "/text-data/data.js";

const main = document.querySelector("main");

// Render + save original
sentences.forEach(sentence => {
    const p = document.createElement("p");
    p.dataset.original = sentence;
    p.textContent = hideThreeWords(sentence); // hide 3 immediately
    main.appendChild(p);
});

// Function to re-hide new words every 5s
function hideNewWords() {
    const allP = main.querySelectorAll("p");

    allP.forEach(p => {
        const original = p.dataset.original;
        p.textContent = hideThreeWords(original);
    });
}

setInterval(hideNewWords, 5000);