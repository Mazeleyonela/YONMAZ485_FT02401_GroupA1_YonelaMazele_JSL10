document.addEventListener("DOMContentLoaded", () => {
    // 🪲 Bug: Incorrect ID used for attaching the event listener
    document.getElementById("solveRoom1").addEventListener("click", () => { // put in the correct ID
        fetch('books.json') 
            .then(response => response.json())
            .then(books => {
                const mostRecentBook = findMostRecentBook(books);
                // 🪲 Bug: Incorrect element ID
                document.getElementById("room1Result").textContent = `The key to the next room is: ${mostRecentBook.title}`; //put in the correct ID
            });
    });

    document.getElementById("solveRoom2").addEventListener("click", () => {
        const jsConcepts = new Set(['closure', 'scope', 'hoisting']);
        const reactConcepts = new Set(['components', 'jsx', 'hooks', 'async']);
        const commonConcepts = findIntersection(jsConcepts, reactConcepts); // Incorrect function call - reactConcepts, instead ofjsConcepts
        document.getElementById("room2Result").textContent = `The code to unlock the door is: ${Array.from(commonConcepts).join(', ')}`;
    });

    // 🪲 Bug: Asynchronous function ?
    document.getElementById("solveRoom3").addEventListener("click", () => {
        fetch('directions.json') 
            .then(response => response.json())
            .then(async directions => { //added async keyword
                await navigateLabyrinth(directions) //await navigation
                    .then(message => {
                        document.getElementById("room3Result").innerHTML = `${message}`; //correct method
                    });
            });
    });
});

function findMostRecentBook(books) {
    return books.reduce((mostRecent, book) => new Date(book.published) > new Date(mostRecent.published) ? book : mostRecent); // greater than instead of less than
}

function findIntersection(setA, setB) {
    return new Set([...setA].filter(x => setB.has(x))); // fixed logic
    
}

async function navigateLabyrinth(directions) {
    for (let direction of directions) {
        await new Promise(resolve => setTimeout(resolve, 1000)); //added await for delay
        console.log(`Navigating: ${direction.step}`);
    }
    return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}

