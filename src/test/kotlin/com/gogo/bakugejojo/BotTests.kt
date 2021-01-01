package com.gogo.bakugejojo

import com.gogo.bakugejojo.game.bomber.Bot
import com.gogo.bakugejojo.game.EnumAction
import com.gogo.bakugejojo.game.bomber.BomberInfo
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe
import java.util.*

class BotTests : StringSpec({
    "property hp of object of class Bot should be equal to hp from super constructor" {
        Bot(BomberInfo("Bot"), 100, 0, 0).hp shouldBe 100
    }
})

