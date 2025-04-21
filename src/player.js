const Gameboard = require("./gameboard");

class Player {
	constructor() {
		this.gameboard = new Gameboard();
		this.showShip = false;
	}
}

module.exports = Player;
