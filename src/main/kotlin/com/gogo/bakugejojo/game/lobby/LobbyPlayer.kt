package com.gogo.bakugejojo.game.lobby

import com.gogo.bakugejojo.game.bomber.Character

class LobbyPlayer(
	var ready: Boolean = false,
	var x: Int = 0,
	var y: Int = 0,
	var character: Character = Character.None
)
