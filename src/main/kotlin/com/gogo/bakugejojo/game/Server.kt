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
						mutableListOf(
							LobbyPlayer(players[0], character = Character.Jotaro),
							LobbyPlayer(players[1], character = Character.Dio)
						)
					)
				)
			)
		}
	}
}
