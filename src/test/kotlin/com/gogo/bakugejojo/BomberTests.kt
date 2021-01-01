package com.gogo.bakugejojo

import com.gogo.bakugejojo.game.Bomb
import com.gogo.bakugejojo.game.EnumAction
import com.gogo.bakugejojo.game.bomber.BomberInfo
import com.gogo.bakugejojo.game.bomber.Player
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.date.shouldBeBefore
import io.kotest.matchers.shouldBe
import java.time.LocalDateTime
import java.util.*

class BomberTests : StringSpec({
    "bomb from deploybomb method of bomber should have appropriate deployment date" {
        val date1 = LocalDateTime.now()
        val bomb = Player(BomberInfo("Bomber"), 3, 0, 0).deployBomb()
        date1 shouldBeBefore bomb.deployed
    }
    "bomb from deploybomb method of basic bomber should have default duration" {
        val bomb = Player(BomberInfo("Bomber"), 3, 0, 0).deployBomb()
        bomb.duration shouldBe Bomb.defaultFuse
    }
})
