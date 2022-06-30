const elements = document.querySelectorAll(".element");
let moves = [[NaN, NaN, NaN], [NaN, NaN, NaN], [NaN, NaN, NaN]];
let player = "X";
let onLoad = false;

window.onload = () => {
    for (let el of elements) {
        el.onclick = () => {
            const line = el.dataset.line;
            const column = el.dataset.column;
            if (parseInt(el.dataset.clicked, 10) === 0 && onLoad === false) {
                switch (player) {
                    case "X":
                        el.querySelector("p").textContent = "X";
                        moves[line][column] = "X";
                        player = "O";
                        break;
                    case "O":
                        el.querySelector("p").textContent = "O";
                        moves[line][column] = "O";
                        player = "X";
                        break;
                };

                el.dataset.clicked = 1;
                check();
            };
        };
    };
};

/* 
00 01 02
10 11 12
20 21 22
*/

function check() {
    let gameOver = false;

    if (moves[0][0] === moves[0][1] && moves[0][0] === moves[0][2]) {
        drawLine("line0");
        gameOver = true;
    };
    if (moves[1][0] === moves[1][1] && moves[1][0] === moves[1][2]) {
        drawLine("line1");
        gameOver = true;
    };
    if (moves[2][0] === moves[2][1] && moves[2][0] === moves[2][2]) {
        drawLine("line2");
        gameOver = true;
    };

    if (moves[0][0] === moves[1][0] && moves[0][0] === moves[2][0]) {
        drawLine("column0");
        gameOver = true;
    };
    if (moves[0][1] === moves[1][1] && moves[0][1] === moves[2][1]) {
        drawLine("column1");
        gameOver = true;
    };
    if (moves[0][2] === moves[1][2] && moves[0][2] === moves[2][2]) {
        drawLine("column2");
        gameOver = true;
    };

    if (moves[0][0] === moves[1][1] && moves[0][0] === moves[2][2]) {
        drawLine("diagonal0");
        gameOver = true;
    };
    if (moves[2][0] === moves[1][1] && moves[2][0] === moves[0][2]) {
        drawLine("diagonal1");
        gameOver = true;
    };

    if (gameOver || allChecked()) {
        onLoad = true;
        setTimeout(newGame, 2000);
    };
};

function allChecked() {
    for (let el of elements) {
        if (parseInt(el.dataset.clicked, 10) === 0) {
            return false;
        }
    }
    return true;
}

function newGame() {
    moves = [[NaN, NaN, NaN], [NaN, NaN, NaN], [NaN, NaN, NaN]];
    for (let el of elements) {
        el.dataset.clicked = 0;
        el.querySelector("p").textContent = "";

        const lines = el.querySelectorAll("div");
        for (let l of lines) {
            l.style.display = "none";
        };
    };

    onLoad = false;
};

/* 
0 1 2
3 4 5
6 7 8 
*/

function drawLine(value) {
    switch (value) {
        case "line0":
            elements[0].querySelector(".horizontal").style.display = "flex";
            elements[1].querySelector(".horizontal").style.display = "flex";
            elements[2].querySelector(".horizontal").style.display = "flex";
            break;
        case "line1":
            elements[3].querySelector(".horizontal").style.display = "flex";
            elements[4].querySelector(".horizontal").style.display = "flex";
            elements[5].querySelector(".horizontal").style.display = "flex";
            break;
        case "line2":
            elements[6].querySelector(".horizontal").style.display = "flex";
            elements[7].querySelector(".horizontal").style.display = "flex";
            elements[8].querySelector(".horizontal").style.display = "flex";
            break;
        case "column0":
            elements[0].querySelector(".vertical").style.display = "flex";
            elements[3].querySelector(".vertical").style.display = "flex";
            elements[6].querySelector(".vertical").style.display = "flex";
            break;
        case "column1":
            elements[1].querySelector(".vertical").style.display = "flex";
            elements[4].querySelector(".vertical").style.display = "flex";
            elements[7].querySelector(".vertical").style.display = "flex";
            break;
        case "column2":
            elements[2].querySelector(".vertical").style.display = "flex";
            elements[5].querySelector(".vertical").style.display = "flex";
            elements[8].querySelector(".vertical").style.display = "flex";
            break;
        case "diagonal0":
            elements[0].querySelector(".main-diagonal").style.display = "flex";
            elements[4].querySelector(".main-diagonal").style.display = "flex";
            elements[8].querySelector(".main-diagonal").style.display = "flex";
            break;
        case "diagonal1":
            elements[2].querySelector(".secondary-diagonal").style.display = "flex";
            elements[4].querySelector(".secondary-diagonal").style.display = "flex";
            elements[6].querySelector(".secondary-diagonal").style.display = "flex";
            break;
    };
};
