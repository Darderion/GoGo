package com.gogo.bakugejojo.controller

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.servlet.ModelAndView

import org.springframework.web.servlet.view.RedirectView




@Controller
class LobbyController {
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
}