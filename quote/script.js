// HTML elements
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");

// Function to fetch and display a random quote
async function getQuote() {
    try {
        // Fetch the JSON file
        const response = await fetch("json.json");
        if (!response.ok) {
            throw new Error("Failed to fetch JSON file");
        }
        const quotes = await response.json();

        // Randomly select a quote
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        // Update the HTML elements
        quoteElement.innerText = `"${randomQuote.content}"`;
        authorElement.innerText = `- ${randomQuote.author}`;
    } catch (error) {
        console.error("Error fetching quotes:", error);
        quoteElement.innerText = "Could not load quotes.";
        authorElement.innerText = "";
    }
}

// Fetch the first quote on page load
getQuote();