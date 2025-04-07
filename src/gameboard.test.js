const Gameboard = require("./gameboard");

describe("import test", () => {
	test("should ", () => {
		expect(typeof Gameboard).toBe("function");
	});
});

describe("Gameboard Tests", () => {
	test("places ship horizontally", () => {
		let gameboard;
		gameboard = new Gameboard();
		gameboard.placeShip(0, 0, true);
		expect(gameboard.board[0][0]).toBe("ship");
		expect(gameboard.board[0][1]).toBe("ship");
	});

	test("places ship vertically", () => {
		let gameboard;
		gameboard = new Gameboard();
		gameboard.placeShip(0, 0, false);
		expect(gameboard.board[0][0]).toBe("ship");
		expect(gameboard.board[1][0]).toBe("ship");
	});

	test("throws error when ship placed off board horizontally", () => {
		let gameboard;
		gameboard = new Gameboard();
		expect(() => {
			gameboard.placeShip(0, 9, true);
		}).toThrow("attemping to place ship off the board");
	});
	test("throws error when ship placed off board horizontally", () => {
		let gameboard;
		gameboard = new Gameboard();
		expect(() => {
			gameboard.placeShip(0, 9, false);
		}).toThrow("attemping to place ship off the board");
	});
});
