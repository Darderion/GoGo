package com.gogo.bakugejojo.controller

import com.gogo.bakugejojo.game.Game
import com.gogo.bakugejojo.game.Server
import com.gogo.bakugejojo.game.bomber.Character
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.servlet.ModelAndView

@Controller
class GameController {

	@Autowired
	lateinit var server: Server

	@GetMapping("/game")
	fun game(): ModelAndView {
		val model = ModelAndView()
		model.addObject("game", server.lobbies.first().game)
		return model
	}

	@GetMapping("/api/update")
	fun update(@RequestParam token: Int): ResponseEntity<Game> =
		ResponseEntity(server.findGame(token), HttpStatus.OK)

	@GetMapping("api/moveCharacter")
	fun moveSelector(
		@RequestParam token: Int,
		@RequestParam dx: Int,
		@RequestParam dy: Int
	): ResponseEntity<String> {
		val game = server.findGame(token)
			?: return ResponseEntity("Err:IncorrectToken", HttpStatus.OK)

		game.move(token, dx, dy)
		return ResponseEntity("Response:CorrectToken", HttpStatus.OK)
	}
}