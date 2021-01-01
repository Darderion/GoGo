package com.gogo.bakugejojo

import com.gogo.bakugejojo.game.map.EnumTile
import com.gogo.bakugejojo.game.map.Tile
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe

class TileTests : StringSpec({
    "surroundings of a tile should be equal to it's neighbors combined with itself" {
        val tile = Tile(EnumTile.Wall)
        val tiles = arrayOf(Tile(EnumTile.Wall), Tile(), Tile(), Tile())
        tile.setNeighbors(tiles)
        tile.surroundings.size shouldBe 5
        tile.surroundings.filter { it.id === EnumTile.Wall }.size shouldBe 2
        tile.surroundings.filter { it.id === EnumTile.Empty }.size shouldBe 3
    }
})