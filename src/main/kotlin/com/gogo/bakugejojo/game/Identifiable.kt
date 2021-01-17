package com.gogo.bakugejojo.game

interface Identifiable {
	var id: Int
}

class Identificator {
	companion object {
		var currentId = 1
		fun get() = currentId++
	}
}
