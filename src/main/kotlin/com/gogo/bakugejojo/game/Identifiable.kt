package com.gogo.bakugejojo.game

abstract class Identifiable {
	var id = Identifiable.id

	override fun equals(other: Any?): Boolean {
		if (this === other) return true
		if (other is Identifiable) {
			return this.id == other.id
		}
		return false
	}

	override fun hashCode() = this.id

	companion object {
		private var currentId = 1
		val id get() = currentId++
	}
}
