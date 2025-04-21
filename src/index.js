import Ship from "./ship";
import "./styles.css";

const Player = require("./player");

const player1 = new Player();
const player2 = new Player();

const gameContainer = document.querySelector(".gameContainer");
const shuffleButton = document.querySelector(".shuffle");
shuffleButton.addEventListener("click", () => {
	shuffle();
});

function makeTiles(player) {
	let playerContainer = document.createElement("div");
	playerContainer.classList.add("playerContainer");
	let playerGrid = document.createElement("div");
	playerGrid.classList.add("playerGrid");
	player.gameboard.board.forEach((element) => {
		element.forEach((element) => {
			let tile = document.createElement("div");
			tile.classList.add("tile");
			if (player.showShip == true && element.ship) {
				tile.innerHTML = "X";
			}
			tile.addEventListener("click", () => {
				if (element.ship != null) {
					tile.style.background = "green";
				} else {
					tile.style.background = "red";
				}
			});
			playerGrid.appendChild(tile);
		});
	});
	playerContainer.appendChild(playerGrid);
	gameContainer.appendChild(playerContainer);
}
// player1.gameboard.placeShip(1, 1, true, 3);
// player1.gameboard.placeShip(1, 0, true, 3);
player1.showShip = true;
placeShips(player1);
placeShips(player2);
makeTiles(player1);
makeTiles(player2);


function placeShips(player) {
	let amountOfShips = 5;
	let maxLength = 4;
	for (let index = 0; index < amountOfShips; index++) {
		// add length to get rid of magic number
		let firstRandom = Math.floor(Math.random() * 5); // TODO add gameboard width and height to get rid of magic number
		let secondRandom = Math.floor(Math.random() * 5); // TODO add gameboard width and height to get rid of magic number
		let placed = player.gameboard.placeShip(
			firstRandom,
			secondRandom,
			true,
			3,
		);
		if (!placed) {
			let placedsuc = false;
			while (!placedsuc) {
				let firstRandom = Math.floor(Math.random() * 5); // TODO add gameboard width and height to get rid of magic number
				let secondRandom = Math.floor(Math.random() * 5); // TODO add gameboard width and height to get rid of magic number
				placedsuc = player.gameboard.placeShip(
					firstRandom,
					secondRandom,
					true,
					3, // TODO add length to get rid of magic number
				);
			}
		}
	}
}

// this can work for calling attacks and placing ships randomly

// might want to add this to game board class or player class to we can use
// stored postion as a member var
function pickRandomPos(storedPostions) {
	let x, y;

	if (storedPostions == undefined) {
		x = Math.floor(Math.random() * 5);
		y = Math.floor(Math.random() * 5);
		return [x, y];
	}
	if (storedPostions.length >= 25) {
		console.log("All positions taken");
		return null;
	}

	do {
		x = Math.floor(Math.random() * 5);
		y = Math.floor(Math.random() * 5);
	} while (storedPostions.some((pos) => pos[0] === x && pos[1] === y));

	storedPostions.push([x, y]);
	return [x, y];
}

let storedPostions = [];
pickRandomPos(storedPostions);
