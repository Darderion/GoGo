package com.gogo.bakugejojo.game

class Bomb(
	var duration: Int,
	var position: Position
) : Snapshotable {
	var deployed: Int = 0

	fun deploy(deployment: Int): Bomb {
		deployed = deployment
		return this
	}

	constructor(duration: Int, x: Int, y: Int) : this(duration, Position(x, y))

	companion object {
		const val defaultFuse = 1000
	}

	override fun getSnapshot() = listOf(this.snapshotSize(), deployed, duration, position.x, position.y)

	override fun setSnapshot(snapshot: List<Int>) {
		deployed = snapshot[1]
		duration = snapshot[2]
		position.x = snapshot[3]
		position.y = snapshot[4]
	}

	override fun snapshotSize() = 4
}
