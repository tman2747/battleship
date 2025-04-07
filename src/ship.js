class Ship {
	constructor(length) {
		if (!length) {
			throw new Error("ship must have a length");
		}
		this.length = length;
		this.hits = 0;
		this.sunk = false;
	}
	hit() {
		this.hits++;
		if (this.hits >= this.length) {
			this.#sink();
		}
	}
	#sink() {
		this.sunk = true;
	}
	isSunk() {
		return this.sunk;
	}
}

module.exports = Ship;
