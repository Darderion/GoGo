package com.gogo.bakugejojo

import io.kotest.core.spec.style.StringSpec
import io.kotest.core.spec.style.*
import io.kotest.matchers.shouldBe

class BotTests : StringSpec({
    "property hp of object of class Bot should be equal to hp from super constructor" {
       Bot("Bot",100,0,0) .hp shouldBe 100
    }
})

