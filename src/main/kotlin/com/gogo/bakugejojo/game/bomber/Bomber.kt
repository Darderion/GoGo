package com.gogo.bakugejojo.game.bomber

import com.gogo.bakugejojo.game.Action
import com.gogo.bakugejojo.game.Bomb
import com.gogo.bakugejojo.game.EnumAction
import com.gogo.bakugejojo.game.Snapshotable
import java.time.LocalDateTime

abstract class Bomber(
    val info: BomberInfo,
    var hp: Int,
    var x: Int,
    var y: Int
) : Snapshotable {
    private val actions: Map<EnumAction, Action> = mutableMapOf()

    fun deployBomb() = Bomb(Bomb.defaultFuse, x, y)

    override fun getSnapshot() = listOf(this.snapshotSize(), hp, x, y)

    override fun setSnapshot(snapshot: List<Int>) {
        hp = snapshot[1]
        x = snapshot[2]
        y = snapshot[3]
    }

    override fun snapshotSize() = Bomber.snapshotSize()

    companion object {
        fun snapshotSize() = 3
    }
}
