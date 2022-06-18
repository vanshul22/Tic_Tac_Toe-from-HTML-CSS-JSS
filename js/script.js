const bgMusic = new Audio("../media/music.mp3");
const turnAudio = new Audio("../media/ting.mp3");
const gameOverAudio = new Audio("../media/gameover.mp3");

let turn = "X";
let isGameOver = false;

// Function to change the Turn
const changeTurn = () => turn === "X" ? "0" : "X";

// Function to check for a win.
const checkWin = () => {
    let boxTexts = document.getElementsByClassName("box-text");
    let wins = [
        [0, 1, 2, 0, 5, 0],
        [3, 4, 5, 0, 15, 0],
        [6, 7, 8, 0, 25, 0],
        [0, 3, 6, -10, 15, 90],
        [1, 4, 7, 0, 15, 90],
        [2, 5, 8, 10, 15, 90],
        [0, 4, 8, 0, 15, 45],
        [2, 4, 6, 0, 15, 135]
    ];
    wins.forEach(e => {
        if ((boxTexts[e[0]].innerText === boxTexts[e[1]].innerText) && (boxTexts[e[2]].innerText === boxTexts[e[1]].innerText) && (boxTexts[e[0]].innerText !== "")) {
            document.querySelector(".info").innerText = `${boxTexts[e[0]].innerText} Won`;
            isGameOver = true;
            document.querySelector(".img-box").getElementsByTagName("img")[0].style.width = "12em";
            document.querySelector(".line").style.width = "30vw";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            gameOverAudio.play();
        }
    });
};


// Game Logic
bgMusic.play();
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxText = element.querySelector(".box-text");
    element.addEventListener("click", () => {
        if (boxText.innerText === "") {
            boxText.innerText = turn;
            turn = changeTurn();
            turnAudio.play();
            checkWin();
            if (!isGameOver) {
                document.getElementsByClassName("info")[0].innerText = `Turn for ${turn}`
            }
        }
    })
});

// Adding event listener to reset button...
let reset = document.getElementById("reset");
reset.addEventListener("click", () => {
    let boxTexts = document.querySelectorAll(".box-text");
    Array.from(boxTexts).forEach(boxText => {
        boxText.innerText = "";
    });
    turn = "X";
    isGameOver = false;
    document.getElementsByClassName("info")[0].innerText = `Turn for ${turn}`;
    document.querySelector(".img-box").getElementsByTagName("img")[0].style.width = "0em";
    document.querySelector(".line").style.width = "0vw";
});