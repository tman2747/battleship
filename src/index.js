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
			playerGrid.appendChild(tile);
		});
	});
	playerContainer.appendChild(playerGrid);
	gameContainer.appendChild(playerContainer);
}
player1.gameboard.placeShip(0, 0, true, 3);
player2;

makeTiles(player1);
makeTiles(player2);
