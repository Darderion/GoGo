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

	@GetMapping("api/setReady")
	fun setReady(
			@RequestParam lobbyId: Int,
			@RequestParam token: Int,
			@RequestParam status: Boolean
	) = try {
		val player = server.getPlayer(token)
		val lobby = server.getLobby(player)
		if(lobby.gameStarted) throw Exception("GameStarted")
		lobby.players.first { it.account == player }.ready = status
		ResponseEntity("Response:${lobby.players.first { it.account == player }.ready}", HttpStatus.OK)
} catch (e: Exception) { ResponseEntity("Err:${e.message}",HttpStatus.OK)}

	@GetMapping("api/getLobbyInfo")
	fun getLobbyInfo(@RequestParam lobbyId: Int) = try {
		val lobby = server.getLobby(lobbyId)
		if (lobby.gameStarted) throw Exception("GameStarted")
		ResponseEntity(lobby, HttpStatus.OK)
	} catch (e: Exception) { ResponseEntity(null as Lobby?, HttpStatus.OK) }
}