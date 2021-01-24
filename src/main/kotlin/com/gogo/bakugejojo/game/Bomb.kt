package com.gogo.bakugejojo.game

class Bomb(
	var duration: Int,
	var position: Position
) : Snapshotable, Identifiable {
	var deployed: Int = 0
	override var id = Identificator.get()

	fun deploy(deployment: Int): Bomb {
		deployed = deployment
		return this
	}

	constructor(duration: Int, x: Int, y: Int) : this(duration, Position(x, y))

	companion object {
		const val defaultFuse = 1000
	}

	override fun getSnapshot() = listOf(this.snapshotSize(), id, deployed, duration, position.x, position.y)

	override fun setSnapshot(snapshot: List<Int>) {
		id = snapshot[1]
		deployed = snapshot[2]
		duration = snapshot[3]
		position.x = snapshot[4]
		position.y = snapshot[5]
	}

	override fun snapshotSize() = 5
}
