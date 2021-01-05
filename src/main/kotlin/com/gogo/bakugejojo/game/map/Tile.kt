package com.gogo.bakugejojo.game.map

import com.gogo.bakugejojo.game.Snapshotable

class Tile(
	var id: EnumTile = EnumTile.Empty
) : Snapshotable {
	private var neighbors: Array<Tile> = arrayOf()

	fun setNeighbors(neighbors: Array<Tile>) {
		this.neighbors = neighbors
	}

	val surroundings get() = neighbors + this

	override fun getSnapshot() = listOf(this.snapshotSize(), this.id.ordinal)

	override fun setSnapshot(snapshot: List<Int>) {
		id = EnumTile.values()[snapshot[1]]
	}

	override fun snapshotSize() = Tile.snapshotSize()

	companion object {
		fun snapshotSize() = 1
	}
}
