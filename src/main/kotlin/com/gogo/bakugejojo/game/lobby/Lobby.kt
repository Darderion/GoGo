package com.gogo.bakugejojo.game.lobby

import com.gogo.bakugejojo.game.Account
import com.gogo.bakugejojo.game.Game
import com.gogo.bakugejojo.game.Position
import com.gogo.bakugejojo.game.bomber.BomberInfo
import com.gogo.bakugejojo.game.bomber.Character
import com.gogo.bakugejojo.game.bomber.Player
import com.gogo.bakugejojo.game.map.BattleMap
import com.gogo.bakugejojo.game.map.MapInfo

class Lobby(
	val id: Int,
	val map: MapInfo,
	val players: MutableList<LobbyPlayer>,
	var game: Game? = null,
	var gameStarted: Boolean = false,
	val characters: HashMap<Position, Character> = hashMapOf()
) {
	init {
		characters[Position(0, 0)] = Character.Jotaro
		characters[Position(1, 0)] = Character.Dio
	}

	fun start() {
		game = Game(
			BattleMap(map),
			players.map { Player(BomberInfo(it.account.name, it.character), 100, 0, 0, it.account) }
		)
		gameStarted = true
	}
}
