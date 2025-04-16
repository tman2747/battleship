import Ship from "./ship";
import "./styles.css";

const Player = require("./player");

const player1 = new Player();
const player2 = new Player();

const gameContainer = document.querySelector(".gameContainer");

function makeTiles(player) {
	let playerContainer = document.createElement("div");
	playerContainer.classList.add("playerContainer");
	let playerGrid = document.createElement("div");
	playerGrid.classList.add("playerGrid");
	player.gameboard.board.forEach((element) => {
		element.forEach((element) => {
			let tile = document.createElement("div");
			tile.classList.add("tile");
			if (element.ship != null) {
				console.log(element);
				tile.innerHTML = "[]";
			}
			// tile.addEventListener("click", () => {
			// 	tile.style.background = "red";
			// }); // add something like this so when the ship gets hit it selects the correct color and displays it
			playerGrid.appendChild(tile);
		});
	});
	playerContainer.appendChild(playerGrid);
	gameContainer.appendChild(playerContainer);
}
// player1.gameboard.placeShip(1, 1, true, 3);
// player1.gameboard.placeShip(1, 0, true, 3);
placeShips(player1);
makeTiles(player1);
makeTiles(player2);

// make function that picks random positions

function placeShips(player) {
	let amountOfShips = 2;
	let maxLength = 4;
	for (let index = 0; index < amountOfShips; index++) {
		if (!player.gameboard.placeShip(0, 0, true, 3)) {
			let firstRandom = Math.floor(Math.random() * 4);
			let secondRandom = Math.floor(Math.random() * 4);
			while (
				player.gameboard.placeShip(firstRandom, secondRandom, true, 3)
			);
			console.log(firstRandom, secondRandom);
		}
	}
}

// probably need to change my gameboard place ship to insure no other ships
// get placed on top of eachother
