package com.gogo.bakugejojo

import com.gogo.bakugejojo.game.Bot
import com.gogo.bakugejojo.game.EnumAction
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe
import java.util.*

class BotTests : StringSpec({
    "property hp of object of class Bot should be equal to hp from super constructor" {
        Bot("Bot",100,0,0, EnumMap(EnumAction::class.java)).hp shouldBe 100
    }
})

