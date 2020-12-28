package com.gogo.bakugejojo

import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.date.shouldBeBefore
import io.kotest.matchers.shouldBe
import java.time.LocalDateTime
import java.util.*

class BomberTests : StringSpec({
    "bomb from deploybomb method of bomber should have appropriate deployment date" {
        val date1 = LocalDateTime.now()
        val bomb = Player("Bomber", 3, 0, 0, EnumMap(EnumAction::class.java)).deployBomb()
        date1 shouldBeBefore bomb.deployed
    }
    "bomb from deploybomb method of basic bomber should have default duration" {
        val date1 = LocalDateTime.now()
        val bomb = Player("Bomber", 3, 0, 0, EnumMap(EnumAction::class.java)).deployBomb()
        bomb.duration shouldBe Bomb.defaultFuse
    }
})
