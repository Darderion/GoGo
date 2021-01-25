package com.gogo.bakugejojo.controller

import com.gogo.bakugejojo.game.Server
import com.gogo.bakugejojo.game.bomber.Character
import com.gogo.bakugejojo.game.lobby.Lobby
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam

@Controller
class LobbyController {
	@Autowired
	lateinit var server: Server

	// "URL:lobby?token=${token}&lobby=${lobby.id}"
	@GetMapping("/lobby")
	fun lobby(model: Model,
			  @RequestParam token: String,
			  @RequestParam lobby: String
	): String {
		model.addAttribute("token", token)
		model.addAttribute("lobby", lobby)
		return "lobby"
	}

	@GetMapping("api/moveCharacterSelector")
	fun moveSelector(
		@RequestParam lobbyId: Int,
		@RequestParam token: Int,
		@RequestParam character: String
	) = try {
		val characterVal = Character.valueOf(character)
		val player = server.getPlayer(token)
		val lobby = server.getLobby(player)
		if (lobby.gameStarted) throw Exception("GameStarted")
		lobby.players.first { it.account == player }.character = characterVal
		ResponseEntity("Response:${lobby.players.first { it.account == player }.character}", HttpStatus.OK)
	} catch (e: Exception) { ResponseEntity("Err:${e.message}", HttpStatus.OK) }

	@GetMapping("api/getLobbyInfo")
	fun getLobbyInfo(@RequestParam lobbyId: Int) =
		ResponseEntity(server.findLobby(lobbyId), HttpStatus.OK)

	@GetMapping("api/ready")
	fun setReadyState(
		@RequestParam token: Int
	): ResponseEntity<Lobby?> {
		val lobby = server.findLobby { it.players.any { it.account.id == token } }
			?: return ResponseEntity(null, HttpStatus.OK)
		val player = lobby.players.first { it.account.id == token }
		player.ready = true
		if (lobby.players.filterNot { it.ready }.isEmpty()) {
			lobby.gameStarted = true
			return ResponseEntity(lobby, HttpStatus.OK)
		}
		return ResponseEntity(null, HttpStatus.OK)
	}
}