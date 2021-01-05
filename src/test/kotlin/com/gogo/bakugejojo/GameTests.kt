package com.gogo.bakugejojo

import com.gogo.bakugejojo.game.Game
import com.gogo.bakugejojo.game.bomber.BomberInfo
import com.gogo.bakugejojo.game.bomber.Bot
import com.gogo.bakugejojo.game.bomber.Player
import com.gogo.bakugejojo.game.map.BattleMap
import com.gogo.bakugejojo.game.map.EnumTile
import com.gogo.bakugejojo.game.map.MapInfo
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.comparables.shouldBeEqualComparingTo
import io.kotest.matchers.shouldBe
import java.lang.reflect.Field

class GameTests : StringSpec({
    "game's snapshot should correctly load map tiles" {
        val map = BattleMap(
            MapInfo("Map", arrayOf(
            arrayOf(EnumTile.Empty, EnumTile.Wall, EnumTile.Fire),
            arrayOf(EnumTile.Bomb, EnumTile.Fire, EnumTile.Wall)
        )))
        val map2 = BattleMap(MapInfo("Map", arrayOf(
            arrayOf(EnumTile.Empty, EnumTile.Empty, EnumTile.Empty),
            arrayOf(EnumTile.Empty, EnumTile.Empty, EnumTile.Empty)
        )))

        val bomber = Player(BomberInfo("Bomber"), 3, 1, 2)
        val bomber2 = Player(BomberInfo("Bomber2"), 3, 0, 0)
        val bombers = listOf(bomber, bomber2)

        val game = Game(map, bombers)
        val game2 = Game(map2, bombers)
        game2.setSnapshot(game.getSnapshot())

        val gameMap = game.map
        val gameMap2 = game2.map

        for(x in 0..1) {
            for(y in 0..2) {
                gameMap.tiles[x][y].id shouldBeEqualComparingTo gameMap2.tiles[x][y].id
            }
        }
    }
})