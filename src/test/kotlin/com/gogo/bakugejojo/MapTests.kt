package com.gogo.bakugejojo

import com.gogo.bakugejojo.game.bomber.BomberInfo
import com.gogo.bakugejojo.game.bomber.Player
import com.gogo.bakugejojo.game.map.BattleMap
import com.gogo.bakugejojo.game.map.EnumTile
import com.gogo.bakugejojo.game.map.MapInfo
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.*
import io.kotest.matchers.comparables.shouldBeEqualComparingTo
import io.kotest.matchers.string.startWith

class MapTests : StringSpec({
	"map's snapshot should correctly load map tiles" {
		val map = BattleMap(
			MapInfo(
				"Map", arrayOf(
					arrayOf(EnumTile.Empty, EnumTile.Wall, EnumTile.Fire),
					arrayOf(EnumTile.Bomb, EnumTile.Fire, EnumTile.Wall)
				)
			)
		)
		val map2 = BattleMap(
			MapInfo(
				"Map", arrayOf(
					arrayOf(EnumTile.Empty, EnumTile.Empty, EnumTile.Empty),
					arrayOf(EnumTile.Empty, EnumTile.Empty, EnumTile.Empty)
				)
			)
		)
		map2.setSnapshot(map.getSnapshot())

		for (x in 0..1) {
			for (y in 0..2) {
				map.tiles[x][y].id shouldBeEqualComparingTo map2.tiles[x][y].id
			}
		}
	}
})
