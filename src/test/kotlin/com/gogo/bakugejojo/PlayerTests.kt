package com.gogo.bakugejojo

import com.gogo.bakugejojo.game.bomber.BomberInfo
import com.gogo.bakugejojo.game.bomber.Bot
import com.gogo.bakugejojo.game.bomber.Player
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe

class PlayerTests : StringSpec({
	"player's snapshot should correctly load player's position" {
		val bomber = Player(BomberInfo("Bomber"), 3, 1, 2)
		val bomber2 = Player(BomberInfo("Bomber2"), 3, 0, 0)

		bomber2.setSnapshot(bomber.getSnapshot())
	}
})
