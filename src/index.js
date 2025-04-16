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
player1.gameboard.placeShip(0, 0, true, 3);
player1.gameboard.placeShip(2, 2, true, 3);

makeTiles(player1);
makeTiles(player2);

// make function that picks random positions

function placeShips() {
	amountOfShips = 3;
	maxLength = 5;
}

// probably need to change my gameboard place ship to insure no other ships
// get placed on top of eachother
