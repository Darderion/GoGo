package com.gogo.bakugejojo.game

import com.gogo.bakugejojo.game.bomber.BomberInfo
import com.gogo.bakugejojo.game.bomber.Character
import com.gogo.bakugejojo.game.bomber.Player
import com.gogo.bakugejojo.game.map.BattleMap
import com.gogo.bakugejojo.game.map.MapInfo

class Lobby(
	val map: MapInfo,
	val players: Map<Account, Character>,
	var game: Game? = null,
	var gameStarted: Boolean = false
) {
	fun start() {
		game = Game(
			BattleMap(map),
			players.map { Player(BomberInfo(it.key.name, it.value), 100, 0, 0) }
		)
		gameStarted = true
	}
}
