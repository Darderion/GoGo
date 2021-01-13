package com.gogo.bakugejojo.game.lobby

import com.gogo.bakugejojo.game.Account
import com.gogo.bakugejojo.game.bomber.Character

class LobbyPlayer(
	var account: Account,
	var ready: Boolean = false,
	var character: Character = Character.None
)
