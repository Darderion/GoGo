package com.gogo.bakugejojo.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class GameController {
	@GetMapping("/game")
	fun game() = "game"
}