package com.gogo.bakugejojo.game.map

import com.gogo.bakugejojo.game.Snapshotable

class BattleMap(private val info: MapInfo) : Snapshotable {

    var tiles: Array<Array<Tile>> = arrayOf()

    val width get() = info.width
    val height get() = info.height

    init {
        restart()
    }

    fun restart() {
        tiles = info.design.map { it.map { Tile(it) }.toTypedArray() }.toTypedArray()
    }

    override fun getSnapshot() =
        listOf(this.snapshotSize()) + this.tiles.flatten().map { it.getSnapshot() }.flatten()

    override fun setSnapshot(snapshot: List<Int>) {
        var i = 0
        tiles.forEach {
            it.forEach {
                it.setSnapshot(
                    snapshot.subList(
                        (i++) * 2 + 1,
                        i * 2 + 1
                    )
                )
            }
        }
    }

    override fun snapshotSize() = this.width * this.height
}
