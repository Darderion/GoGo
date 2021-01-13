package com.gogo.bakugejojo.game

import com.gogo.bakugejojo.game.bomber.Character
import com.gogo.bakugejojo.game.lobby.Lobby
import com.gogo.bakugejojo.game.lobby.LobbyPlayer
import com.gogo.bakugejojo.game.map.MapInfo
import org.springframework.stereotype.Component

@Component
class Server(
	val players: MutableList<Account> = mutableListOf(),
	val lobbies: MutableList<Lobby> = mutableListOf()
) {
	init {
		if (players.isEmpty()) {
			players.addAll(
				listOf(
					Account(0, "Jotaro", ""),
					Account(1, "Dio", "")
				)
			)
		}
		if (lobbies.isEmpty()) {
			lobbies.addAll(
				listOf(
					Lobby(0, MapInfo("Map Info", arrayOf()),
						hashMapOf(
							Pair(players[0], LobbyPlayer(character = Character.Jotaro)),
							Pair(players[1], LobbyPlayer(character = Character.Dio))
						)
					)
				)
			)
		}
	}
}
