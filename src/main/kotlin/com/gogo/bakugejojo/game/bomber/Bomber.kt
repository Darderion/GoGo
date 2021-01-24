package com.gogo.bakugejojo.game.bomber

import com.gogo.bakugejojo.game.*
import java.time.LocalDateTime

abstract class Bomber(
	val info: BomberInfo,
	var hp: Int,
	var x: Int,
	var y: Int
) : Snapshotable, Identifiable() {
	private val actions: Map<EnumAction, Action> = mutableMapOf()

	fun deployBomb() = Bomb(Bomb.defaultFuse, x, y)

	override fun getSnapshot() = listOf(this.snapshotSize(), id, hp, x, y)

	override fun setSnapshot(snapshot: List<Int>) {
		id = snapshot[1]
		hp = snapshot[2]
		x = snapshot[3]
		y = snapshot[4]
	}

	override fun snapshotSize() = Bomber.snapshotSize()

	companion object {
		fun snapshotSize() = 4
	}
}
