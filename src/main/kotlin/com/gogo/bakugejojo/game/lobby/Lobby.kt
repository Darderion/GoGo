package com.gogo.bakugejojo.game.lobby

import com.gogo.bakugejojo.game.Account
import com.gogo.bakugejojo.game.Game
import com.gogo.bakugejojo.game.bomber.BomberInfo
import com.gogo.bakugejojo.game.bomber.Player
import com.gogo.bakugejojo.game.map.BattleMap
import com.gogo.bakugejojo.game.map.MapInfo

class Lobby(
	val id: Int,
	val map: MapInfo,
	val players: MutableList<LobbyPlayer>,
	var game: Game? = null,
	var gameStarted: Boolean = false
) {
	fun start() {
		game = Game(
			BattleMap(map),
			players.map { Player(BomberInfo(it.account.name, it.character), 100, 0, 0) }
		)
		gameStarted = true
	}
}
