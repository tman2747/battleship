const Ship = require("./ship");

class Tile {
	constructor() {
		this.attacked = false;
		this.ship = null;
		this.domTile = null;
	}
}

class Gameboard {
	constructor() {
		this.board = [];
		for (let i = 0; i < 5; i++) {
			const row = [];
			for (let j = 0; j < 5; j++) {
				row.push(new Tile());
			}
			this.board.push(row);
		}
		this.missedAttack = 0;
		this.ships = [];
	}

	placeShip(x, y, dir, size) {
		if (dir) {
			// Horizontal
			if (x >= this.board.length || y + size > this.board.length) {
				console.log("attempting to place ship off the board");
				return false;
			}
			for (let j = 0; j < size; j++) {
				if (this.board[x][y + j].ship != null) {
					console.log("there's a ship here");
					return false;
				}
			}
			let ship = new Ship(size);
			for (let i = 0; i < size; i++) {
				this.board[x][y + i].ship = ship;
			}
			this.ships.push(ship);
			return true;
		} else {
			// Vertical
			if (y >= this.board.length || x + size > this.board.length) {
				console.log("attempting to place ship off the board");
				return false;
			}
			for (let j = 0; j < size; j++) {
				if (this.board[x + j][y].ship != null) {
					console.log("there's a ship here");
					return false;
				}
			}
			let ship = new Ship(size);
			for (let i = 0; i < size; i++) {
				this.board[x + i][y].ship = ship;
			}
			this.ships.push(ship);
			return true;
		}
	}
	printboard() {
		this.board.forEach((row) => {
			console.log(row.map((tile) => (tile.ship ? "S" : ".")).join(" "));
		});
	}

	receiveAttack(x, y) {
		if (x >= 0 && x < this.board.length && y >= 0 && y < this.board.length) {
			if (this.board[x][y].ship instanceof Ship) {
				this.board[x][y].ship.hit();
				this.board[x][y].attacked = true;
				this.allShipsSunk();
				if (this.board[x][y].domTile != null) {
					this.board[x][y].domTile.style.background = "red";
				}
				return true; // added return true here so you know if attack was successful
			} else {
				this.missedAttack++;
				this.board[x][y].attacked = true;
				if (this.board[x][y].domTile != null) {
					this.board[x][y].domTile.style.background = "gray";
				}
				return false; // added return false here so you know if attack was successful
			}
		}
	}
	allShipsSunk() {
		let returnValue = true;
		this.ships.forEach((element) => {
			if (!element.isSunk()) {
				returnValue = false;
			}
		});
		return returnValue;
	}
}

module.exports = Gameboard;
