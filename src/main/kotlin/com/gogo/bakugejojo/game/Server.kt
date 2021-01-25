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
		lobbies.first().start()
	}

	fun contains(lobby: Lobby) = lobbies.contains(lobby)
	fun contains(player: Account) = players.contains(player)
	fun contains(id: Int) = lobbies.any { it.id == id } || players.any { it.id == id }

	fun getLobby(filterFunction: (Lobby) -> Boolean): Lobby {
		val list = lobbies.filter(filterFunction)
		if (list.isEmpty()) throw NoSuchElementException("No lobby found")
		if (list.size > 1) throw IndexOutOfBoundsException("Found multiple lobbies satisfying a condition")
		return list.first()
	}
	fun getLobby(id: Int) = getLobby { it.id == id }
	fun getLobby(player: Account) = getLobby { it.players.any { it.account == player } }

	fun findLobby(filterFunction: (Lobby) -> Boolean) = lobbies.firstOrNull(filterFunction)
	fun findLobby(id: Int) = lobbies.firstOrNull { it.id == id }
	fun findLobby(player: Account) = lobbies.firstOrNull { it.players.any { it.account == player } }

	fun getPlayer(filterFunction: (Account) -> Boolean): Account {
		val list = players.filter(filterFunction)
		if (list.isEmpty()) throw NoSuchElementException("No player found")
		if (list.size > 1) throw IndexOutOfBoundsException("Found multiple players fitting a condition")
		return list.first()
	}
	fun getPlayer(id: Int) = getPlayer { it.id == id }

	fun findPlayer(filterFunction: (Account) -> Boolean) = players.firstOrNull(filterFunction)
	fun findPlayer(id: Int) = players.firstOrNull { it.id == id }

	fun findGame(playerId: Int) =
		lobbies.firstOrNull {
			it.players.any { it.account.id == playerId } && it.gameStarted && it.game != null
		}?.game
}
