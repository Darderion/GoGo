package com.gogo.bakugejojo

import com.gogo.bakugejojo.game.Bomb
import com.gogo.bakugejojo.game.EnumAction
import com.gogo.bakugejojo.game.bomber.BomberInfo
import com.gogo.bakugejojo.game.bomber.Player
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.comparables.shouldBeEqualComparingTo
import io.kotest.matchers.date.shouldBeBefore
import io.kotest.matchers.ints.shouldBeLessThan
import io.kotest.matchers.shouldBe
import java.time.LocalDateTime
import java.util.*

class BomberTests : StringSpec({
    "bomb from deploybomb method of basic bomber should have default duration" {
        val bomb = Player(BomberInfo("Bomber"), 3, 0, 0).deployBomb()
        bomb.duration shouldBe Bomb.defaultFuse
    }
    "bomber's snapshot should correctly load bomber's position" {
        val bomber = Player(BomberInfo("Bomber"), 3, 1, 2)
        val bomberSnapshot = bomber.getSnapshot()
        val bomber2 = Player(BomberInfo("Bomber2"), 3, 0, 0)
        bomber2.setSnapshot(bomberSnapshot)
        bomber.x shouldBeEqualComparingTo bomber2.x
        bomber.y shouldBeEqualComparingTo bomber2.y
    }
})
