const gameBoard = (function() {

    let coordinates = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    let player = [];
    let computer = [];
    let winning = [["0", "1", "2"], ["3", "4", "5"], ["6", "7", "8"],
        ["0", "3", "6"], ["1", "4", "7"], ["2", "5", "8"],
        ["0", "4", "8"], ["2", "4", "6"]];
    
    let grid = document.getElementById("grid");
    let cell = document.getElementsByClassName("cell");
    let container = document.getElementById("container");
    let resultBox = document.getElementById("result-box");
    let close = document.getElementById("close");
    let resultMsg = document.getElementById("result-msg");
    let restart = document.getElementById("restart");
    
    startGame();

    restart.addEventListener("click", () => startGame());

    function startGame() {
        player = player.filter(e => {
            e == e ? coordinates.push(e) : e != e;
        });
        computer = computer.filter(e => {
            e == e ? coordinates.push(e) : e != e;
        });

        [...cell].forEach(cell => cell.textContent = "");

        grid.style.pointerEvents = "auto";
        grid.addEventListener('click', playerMark.bind(this));
    }

    function playerMark(e)  {
        if (coordinates.includes(e.target.id)) {
            coordinates = coordinates.filter(c => {
                if (c == e.target.id) {
                    player.push(e.target.id);
                    e.target.textContent = "X";
                }
                else return c;
            });
            
            computerMark();
            if (checkWin(player)) gameOver("Player");
            else if (checkDraw("Draw")) gameOver("Draw");
            else if (checkWin(computer)) gameOver("Computer");
        } 
    };

    let computerMark = () => {
        let randomPlay = coordinates[Math.floor(Math.random()*coordinates.length)];
        coordinates = coordinates.filter(c => {
            if (c == randomPlay) computer.push(c);
            else return c;
        });

        [...cell].forEach(e => {
            if (computer.includes(e.id)) e.textContent = "O";
        })
    };

    let checkWin = (arr) => winning.some(array =>  array.every(e => arr.includes(e)));

    let closePopUp = () => {
        container.classList.remove('active');
        resultBox.classList.remove('active');
    };

    let gameOver = (result) => {
        toggle(result);
        grid.style.pointerEvents = "none";
    };

    let toggle = (result) => {
        container.classList.toggle('active');
        resultBox.classList.toggle('active');
        resultMsg.textContent = (result == "Player" || result == "Computer") ? `${result} wins` : `${result}`;

        close.addEventListener("click", closePopUp.bind(this));
    };

    let checkDraw = () =>  coordinates.length == 0;
})(); 