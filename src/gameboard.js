const Ship = require("./ship");

class Gameboard {
	constructor() {
		this.board = new Array(5).fill(null);
		for (let index = 0; index < this.board.length; index++) {
			this.board[index] = new Array(5).fill(null);
		}
	}

	placeShip(x, y, dir) {
		let ship = new Ship(2); // idk how i should refactor this. maybe pass the ship into the function not sure yet..
		if (dir) {
			if (x > this.board.length) {
				throw new Error("attemping to place ship off the board");
			}
			if (ship.length + y > this.board.length) {
				throw new Error("attemping to place ship off the board");
			}
			for (let row = 0; row < this.board.length; row++) {
				for (let col = 0; col < this.board.length; col++) {
					if (row == x && y <= col && ship.length + y > col) {
						this.board[row][col] = "ship";
					}
				}
			}
		} else {
			if (y > this.board.length) {
				throw new Error("attemping to place ship off the board");
			}
			if (ship.length + x > this.board.length) {
				throw new Error("attemping to place ship off the board");
			}
			for (let row = 0; row < this.board.length; row++) {
				for (let col = 0; col < this.board.length; col++) {
					if (row == y && x <= col && ship.length + x > col) {
						this.board[col][row] = "ship";
					}
				}
			}
		}
	}
	printboard() {
		for (let row = 0; row < this.board.length; row++) {
			console.log(this.board[row]);
		}
	}
}
module.exports = Gameboard;
