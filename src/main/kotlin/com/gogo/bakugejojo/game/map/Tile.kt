package com.gogo.bakugejojo.game.map

class Tile(
        val id: EnumTile = EnumTile.Empty
) {
    private var neighbors: Array<Tile> = arrayOf()

    fun setNeighbors(neighbors: Array<Tile>) {
        this.neighbors = neighbors
    }

    val surroundings get() = neighbors + this
}
