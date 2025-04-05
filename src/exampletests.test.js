const faketest = require("./exampletests");

describe("fake tests", () => {
	test("should be 3", () => {
		expect(faketest(1, 2)).toBe(3);
	});
});
