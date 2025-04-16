const Gameboard = require("./gameboard");
const Ship = require("./ship");

describe("import test", () => {
	test("should ", () => {
		expect(typeof Gameboard).toBe("function");
	});
});

describe("Gameboard Tests", () => {
	test("places ship horizontally", () => {
		let gameboard;
		gameboard = new Gameboard();
		gameboard.placeShip(0, 0, true, 2);
		expect(gameboard.board[0][0].ship).toBeInstanceOf(Ship);
		expect(gameboard.board[0][1].ship).toBeInstanceOf(Ship);
	});

	test("places ship vertically", () => {
		let gameboard;
		gameboard = new Gameboard();
		gameboard.placeShip(0, 0, false, 2);
		expect(gameboard.board[0][0].ship).toBeInstanceOf(Ship);
		expect(gameboard.board[1][0].ship).toBeInstanceOf(Ship);
	});

	test("throws error when ship placed off board horizontally", () => {
		let gameboard;
		gameboard = new Gameboard();
		expect(gameboard.placeShip(0, 9, true, 2)).toBe(false);
	});
	test("throws error when ship placed off board vertically", () => {
		let gameboard;
		gameboard = new Gameboard();
		expect(gameboard.placeShip(0, 9, false, 2)).toBe(false);
	});

	test("ship gets hit", () => {
		let gameboard;
		gameboard = new Gameboard();
		gameboard.placeShip(0, 0, false, 2);
		expect(gameboard.board[0][0].ship).toBeInstanceOf(Ship);
		expect(gameboard.board[1][0].ship).toBeInstanceOf(Ship);
		gameboard.receiveAttack(0, 0);
		expect(gameboard.board[0][0].attacked).toBe(true);
	});

	test("all ships sunk to be true", () => {
		let gameboard = new Gameboard();
		gameboard.placeShip(0, 3, false, 2);
		gameboard.receiveAttack(0, 3);
		gameboard.receiveAttack(0, 3);
		expect(gameboard.allShipsSunk()).toBe(true);
	});
	test("all ships sunk to be true", () => {
		let gameboard = new Gameboard();
		gameboard.placeShip(0, 3, false, 2);
		gameboard.placeShip(3, 3, false, 2);
		gameboard.receiveAttack(0, 3);
		gameboard.receiveAttack(0, 3);
		expect(gameboard.allShipsSunk()).toBe(false);
	});
});
