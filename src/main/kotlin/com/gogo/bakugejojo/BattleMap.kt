package com.gogo.bakugejojo

class BattleMap(val name: String = "defaultMapName", private val design: Array<Array<EnumTile>>) {

    var tiles: Array<Array<Tile>> = arrayOf()

    init {
        restart()
    }

    fun restart() {
        tiles = design.map { it.map { Tile(it) }.toTypedArray() }.toTypedArray()
    }
}
