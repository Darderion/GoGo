package com.gogo.bakugejojo.controller

import com.gogo.bakugejojo.game.Server
import com.gogo.bakugejojo.game.bomber.Character
import com.gogo.bakugejojo.game.lobby.Lobby
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class APIController {
	var id = 0

	@Autowired
	lateinit var server: Server

	@PostMapping("/api/update")
	fun update(): ResponseEntity<String> {
		return ResponseEntity("someText", HttpStatus.OK)
	}

	@GetMapping("/api/getToken")
	fun getToken(): ResponseEntity<String> {
		id = (id + 1) % server.players.size
		return ResponseEntity(
			id.toString(),
			HttpStatus.OK
		)
	}

	@GetMapping("api/getTokenURL")
	fun getTokenURL(@RequestParam token: Int) = try {
		val player = server.findPlayer { it.id == token }
		val lobby = server.findLobby(player)
		if (lobby.gameStarted) throw Exception("GameStarted")
		ResponseEntity(
			"URL:lobby?token=${token}&lobby=${lobby.id}",
			HttpStatus.OK
		)
	} catch (e: Exception) { ResponseEntity("Err:${e.message}", HttpStatus.OK) }
}