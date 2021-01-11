package com.gogo.bakugejojo.game

import org.springframework.stereotype.Component

@Component("Server")
class Server(
	val players: List<Account> = listOf(
		Account(0, "Jotaro", ""),
		Account(1, "Dio", "")
	),
	val lobbies: List<Lobby> = listOf()
)
