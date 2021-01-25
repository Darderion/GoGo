package com.gogo.bakugejojo.controller

import com.gogo.bakugejojo.game.Server
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

	@GetMapping("/api/getToken")
	fun getToken(): ResponseEntity<Int> {
		id = (id + 1) % server.players.size
		return ResponseEntity(id, HttpStatus.OK)
	}

	@GetMapping("api/getTokenURL")
	fun getTokenURL(@RequestParam token: Int): ResponseEntity<String> {
		val player = server.findPlayer { it.id == token }
			?: return ResponseEntity("Err:NoPlayerWithToken{${token}}", HttpStatus.OK)

		val lobby = server.findLobby(player)
			?: return ResponseEntity("URL:/", HttpStatus.OK)

		return if (!lobby.gameStarted) {
			ResponseEntity("URL:lobby?token=${token}&lobby=${lobby.id}", HttpStatus.OK)
		} else {
			ResponseEntity("URL:game?token=${token}&lobby=${lobby.id}", HttpStatus.OK)
		}
	}
}