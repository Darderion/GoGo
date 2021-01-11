package com.gogo.bakugejojo.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam

@Controller
class LobbyController {
	// "URL:lobby?token=${token}&lobby=${lobby.id}"
	@GetMapping("/lobby")
	fun lobby(@RequestParam token: String,
			  @RequestParam lobby: String) = "lobby?token=${token}&lobby=${lobby}"
}