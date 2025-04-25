import Ship from "./ship";
import "./styles.css";

const Player = require("./player");

const gameContainer = document.querySelector(".gameContainer");
const shuffleButton = document.querySelector(".play");
shuffleButton.addEventListener("click", () => {
	shuffleButton.innerHTML = "shuffle";
	shuffleButton.classList.remove("play");
	shuffleButton.classList.add("shuffle");
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
			else if(element.ship)
			{
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

function shuffle() {
	let player1 = new Player();
	player1.showShip = true;
	let player2 = new Player();
	gameContainer.innerHTML = "";
	placeShips(player1);
	placeShips(player2);
	makeTiles(player1);
	makeTiles(player2);
}

function placeShips(player) {
	let amountOfShips = 5;
	let maxLength = 5;
	for (let index = 0; index < amountOfShips; index++) {
		// add length to get rid of magic number
		let firstRandom = Math.floor(Math.random() * 5); // TODO add gameboard width and height to get rid of magic number
		let secondRandom = Math.floor(Math.random() * 5); // TODO add gameboard width and height to get rid of magic number
		let placed = player.gameboard.placeShip(
			firstRandom,
			secondRandom,
			true,
			4,
		);
		if (!placed) {
			let placedsuc = false;
			while (!placedsuc) {
				let firstRandom = Math.floor(Math.random() * 5); // TODO add gameboard width and height to get rid of magic number
				let secondRandom = Math.floor(Math.random() * 5); // TODO add gameboard width and height to get rid of magic number
				let length = Math.floor(Math.random() * maxLength + 1); // TODO totally rewrite this
				placedsuc = player.gameboard.placeShip(
					firstRandom,
					secondRandom,
					false,
					length, // TODO add length to get rid of magic number
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
