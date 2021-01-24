package com.gogo.bakugejojo.game

import com.gogo.bakugejojo.game.bomber.Character
import com.gogo.bakugejojo.game.bomber.Player
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

	fun findLobby(filterFunction: (Lobby) -> Boolean): Lobby {
		val list = lobbies.filter(filterFunction)
		if (list.isEmpty()) throw IndexOutOfBoundsException("No lobby found")
		if (list.size > 1) throw NoSuchElementException("Found multiple lobbies satisfying a condition")
		return list.first()
	}

	fun findLobby(lobbyId: Int) = findLobby { it.id == lobbyId }

	fun findLobby(player: Account) = findLobby { it.players.any { it.account == player } }

	fun findPlayer(filterFunction: (Account) -> Boolean): Account {
		val list = players.filter(filterFunction)
		if (list.isEmpty()) throw IndexOutOfBoundsException("No player found")
		if (list.size > 1) throw NoSuchElementException("Found multiple players fitting a condition")
		return list.first()
	}

	fun findPlayer(playerId: Int) = findPlayer { it.id == playerId }
}
