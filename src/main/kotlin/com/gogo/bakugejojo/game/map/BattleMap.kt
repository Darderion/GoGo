package com.gogo.bakugejojo.game.map

class BattleMap(private val info: MapInfo) {

    var tiles: Array<Array<Tile>> = arrayOf()

    init {
        restart()
    }

    fun restart() {
        tiles = info.design.map { it.map { Tile(it) }.toTypedArray() }.toTypedArray()
    }
}
