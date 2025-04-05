const Ship = require("./ship");
let ship = new Ship(5);

describe("Import Test", () => {
	test("should import", () => {
		expect(typeof ship).toBe("object");
	});
});
