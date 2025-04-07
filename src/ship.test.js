const Ship = require("./ship");

describe("Import Test", () => {
	test("should import", () => {
		expect(typeof Ship).toBe("function");
	});
});

describe("Ship tests", () => {
	test("should be sunk", () => {
		let ship = new Ship(5);
		ship.hit();
		ship.hit();
		ship.hit();
		ship.hit();
		ship.hit();
		expect(ship.isSunk()).toBe(true);
	});
	test("should be sunk", () => {
		let ship = new Ship(1);
		ship.hit();
		expect(ship.isSunk()).toBe(true);
	});
	test("should be throw error", () => {
		expect(() => new Ship()).toThrow("ship must have a length");
	});
});
