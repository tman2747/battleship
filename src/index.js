import Ship from "./ship";
import "./styles.css";

const Player = require("./player");

let player1 = new Player();
player1.showShip = true;
let player2 = new Player();
let gameover = false;
const content = document.querySelector(".wrapper");

const gameContainer = document.querySelector(".gameContainer");
const shuffleButton = document.querySelector(".play");
shuffleButton.addEventListener("click", () => {
	shuffleButton.innerHTML = "Start Over";
	shuffleButton.classList.remove("play");
	shuffleButton.classList.add("shuffle");

	shuffle();
});

function makeTiles(player) {
	let playerContainer = document.createElement("div");
	playerContainer.classList.add("playerContainer");
	let playerGrid = document.createElement("div");
	playerGrid.classList.add("playerGrid");
	player.gameboard.board.forEach((element, x) => {
		element.forEach((element, y) => {
			let tile = document.createElement("div");
			tile.classList.add("tile");
			if (player.showShip == true && element.ship) {
				tile.innerHTML = "X";
			}
			element.domTile = tile;
			if (player.showShip == false) {
				tile.addEventListener("click", () => {
					if (!gameover && !player.gameboard.board[x][y].attacked) {
						player.gameboard.receiveAttack(x, y);
						checkgameover();
						const pos = pickRandomPos(storedPostions);
						if (!gameover) {
							if (pos !== null) {
								player1.gameboard.receiveAttack(...pos);
								checkgameover();
							} else {
								console.log("No available positions left");
							}
							console.log(player1.gameboard.ships);
						}
						if (gameover) {
							createPopupWindow();
						}
					}
				});
			}
			console.log(element.domTile);
			playerGrid.appendChild(tile);
		});
	});
	playerContainer.appendChild(playerGrid);
	gameContainer.appendChild(playerContainer);
}

function checkgameover() {
	if (player1.gameboard.allShipsSunk()) {
		gameover = true;
	}
	if (player2.gameboard.allShipsSunk()) {
		gameover = true;
	}
}
function shuffle() {
	player1 = new Player();
	player1.showShip = true;
	player2 = new Player();
	storedPostions = [];
	gameover = false;
	gameContainer.innerHTML = "";
	placeShips(player1);
	placeShips(player2);
	makeTiles(player1);
	makeTiles(player2);
}

function placeShips(player) {
	const amountOfShips = 3;
	const maxLength = 4;
	let placedShips = 0;

	while (placedShips < amountOfShips) {
		const x = Math.floor(Math.random() * 5);
		const y = Math.floor(Math.random() * 5);
		const length = 3; // Keep consistent ship length for now
		const isHorizontal = Math.random() < 0.5;

		const placed = player.gameboard.placeShip(x, y, isHorizontal, length);
		if (placed) {
			placedShips++;
		}
	}
}

// this can work for calling attacks and placing ships randomly

// might want to add this to game board class or player class to we can use
// stored postion as a member var
function pickRandomPos(storedPostions) {
	let x, y;

	if (!storedPostions) {
		x = Math.floor(Math.random() * 5);
		y = Math.floor(Math.random() * 5);
		return [x, y];
	}

	if (storedPostions.length === 25) {
		console.log("All positions taken");
		return null;
	}

	do {
		x = Math.floor(Math.random() * 5);
		y = Math.floor(Math.random() * 5);
		console.log(x, y);
	} while (storedPostions.some((pos) => pos[0] === x && pos[1] === y));

	storedPostions.push([x, y]);
	return [x, y];
}

let storedPostions = [];

function setDateInfo(date) {
	if (date != "") {
		return date + "T00:00:00";
	} else {
		return null;
	}
}
function createPopupWindow() {
	const popupWindow = document.createElement("div");
	popupWindow.classList.add("popup-window");
	popupWindow.addEventListener("click", (event) => {
		if (event.target == popupWindow) {
			popupWindow.remove();
		}
	});

	const createProjectWindow = document.createElement("div");
	createProjectWindow.classList.add("create-project-window");

	const closeButton = document.createElement("div");
	closeButton.classList.add("close");
	closeButton.innerHTML = "x";
	closeButton.addEventListener("click", () => {
		popupWindow.remove();
	});
	createProjectWindow.appendChild(closeButton);

	const windowField = document.createElement("div");
	windowField.classList.add("window-field");

	const form = document.createElement("form");

	const label = document.createElement("label");
	label.htmlFor = "listName";
	if (player1.gameboard.allShipsSunk()) {
		label.innerText = "Player 2 won";
	} else {
		label.innerText = "Player 1 won";
	}

	windowField.appendChild(label);

	const addButton = document.createElement("button");
	addButton.innerHTML = "Play Again";
	addButton.type = "button";

	addButton.addEventListener("click", () => {
		shuffle();
		popupWindow.remove();
	});

	form.appendChild(windowField);
	form.appendChild(addButton);

	createProjectWindow.appendChild(form);

	popupWindow.appendChild(createProjectWindow);

	content.appendChild(popupWindow);
}
