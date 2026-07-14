const size = 8;

let board = [];

let firstTile = null;

let moves = 0;


// Spielfeld erstellen
function createBoard() {

    board = [];

    for (let i = 0; i < size * size; i++) {
        board.push(i);
    }

}


// Kacheln mischen
function shuffle() {

    for (let i = board.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        [board[i], board[j]] =
        [board[j], board[i]];

    }

}


// Spielfeld anzeigen
function render() {

    const container = document.getElementById("board");

    container.innerHTML = "";


    board.forEach((tile, index) => {


        let div = document.createElement("div");

        div.className = "tile";


        // Bildausschnitt berechnen

        let x = tile % size;
        let y = Math.floor(tile / size);


        div.style.backgroundPosition =
        `${x * 100 / (size - 1)}% ${y * 100 / (size - 1)}%`;


        div.onclick = () => selectTile(index);


        container.appendChild(div);

    });

}


// Kachel auswählen
function selectTile(index) {


    if (firstTile === null) {

        firstTile = index;

        document
        .getElementsByClassName("tile")[index]
        .classList.add("selected");


    } else {


        [
            board[firstTile],
            board[index]

        ] = [

            board[index],
            board[firstTile]

        ];


        moves++;

        document.getElementById("moves").innerText = moves;


        firstTile = null;


        render();


        checkWin();

    }

}


// Gewinn prüfen
function checkWin() {


    let solved = board.every(
        (value, index) => value === index
    );


    if (solved) {

        setTimeout(() => {

            alert("🎉 Geschafft! Puzzle gelöst!");

        }, 200);

    }

}


// Neues Spiel starten
function newGame() {

    createBoard();

    shuffle();

    moves = 0;

    document.getElementById("moves").innerText = 0;

    render();

}


// Start
newGame();
