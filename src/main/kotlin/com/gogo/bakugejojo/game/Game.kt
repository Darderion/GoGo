package com.gogo.bakugejojo.game

import com.gogo.bakugejojo.game.bomber.Bomber
import com.gogo.bakugejojo.game.map.BattleMap
import com.gogo.bakugejojo.game.map.Tile

class Game(
	val map: BattleMap,
	private val bombers: List<Bomber>,
	private val bombs: MutableList<Bomb> = mutableListOf()
) : Snapshotable {

	fun restart() {
		map.restart()
		bombs.clear()
	}

	override fun getSnapshot() = map.getSnapshot() + bombers.getSnapshot() + bombs.getSnapshot()

	override fun setSnapshot(snapshot: List<Int>) {
		val mapStart = 0
		val mapFinish = mapStart + snapshot[0] * (Tile.snapshotSize() + 1) + 1
		val mapSnapshot = snapshot.subList(mapStart, mapFinish)
		map.setSnapshot(mapSnapshot)

		val bombersStart = mapFinish
		val bombersFinish = bombersStart + snapshot[mapFinish] * (Bomber.snapshotSize() + 1) + 1
		val bombersSnapshot = snapshot.subList(bombersStart, bombersFinish)
		bombers.setSnapshot(bombersSnapshot)

		bombs.clear()
		bombs.addAll(Array(snapshot[bombersFinish]) {
			Bomb(0, 0, 0)
		})
		bombs.setSnapshot(snapshot.subList(bombersFinish, snapshot.size))
	}

	override fun snapshotSize() = map.snapshotSize() + bombers.snapshotSize() + bombs.snapshotSize()
}
