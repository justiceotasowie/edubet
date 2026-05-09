// 1. Import your array of sentences from the data file
import { sentences } from "/text-data/data.js";

// 2. Get the <main> element where we’ll put all the sentences
const main = document.querySelector("main");

// 3. Loop through each sentence and render it to the page
sentences.forEach(sentence => {
    // Create a new <p> element for this sentence
    const p = document.createElement("p");

    // Save the full original sentence in a data attribute.
    // We need this later so we can re-hide different words every 5s.
    p.dataset.original = sentence;

    // Hide 3 random words immediately and put the result in the <p>
    // hideThreeWords() should return a string with 3 words replaced by blanks
    p.textContent = hideThreeWords(sentence);

    // Add the <p> to the <main> element so it shows on the page
    main.appendChild(p);
});


// 4. Function that reshuffles which words are hidden in all sentences
function hideNewWords() {
    // Get all <p> elements we created inside <main>
    const allP = main.querySelectorAll("p");

    // Loop through each paragraph
    allP.forEach(p => {
        // Get the original full sentence from the data attribute
        const original = p.dataset.original;

        // Call hideThreeWords again on the original sentence
        // This picks 3 new random words to hide each time
        p.textContent = hideThreeWords(original);
    });
}

// 5. Run hideNewWords every 5000ms = 5 seconds automatically
setInterval(hideNewWords, 5000);

// 6. Example of what hideThreeWords might look like
// You probably already have this, but including it for completeness
function hideThreeWords(sentence) {
    // Split sentence into words
    const words = sentence.split(" ");

    // Make a copy so we don't modify the original array
    let wordsCopy = [...words]; 

    // Pick 3 unique random positions to hide
    let positions = [];
    while (positions.length < 3 && positions.length < words.length) {
        let randomPos = Math.floor(Math.random() * words.length);

        // Only add if we haven't picked this position yet
        if (!positions.includes(randomPos)) {
            positions.push(randomPos);
        }
    }

    // Replace the chosen words with blanks
    positions.forEach(pos => {
        wordsCopy[pos] = "_____";
    });

    // Join back into a sentence and return
    return wordsCopy.join(" ");
}