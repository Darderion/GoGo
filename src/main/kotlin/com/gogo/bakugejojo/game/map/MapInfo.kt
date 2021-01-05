package com.gogo.bakugejojo.game.map

class MapInfo(val name: String, val design: Array<Array<EnumTile>>) {
    val width get() = design.size
    val height get() = if (design.isNotEmpty()) design[0].size else 0
}
