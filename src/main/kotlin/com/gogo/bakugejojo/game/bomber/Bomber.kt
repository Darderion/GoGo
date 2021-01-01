package com.gogo.bakugejojo.game.bomber

import com.gogo.bakugejojo.game.Action
import com.gogo.bakugejojo.game.Bomb
import com.gogo.bakugejojo.game.EnumAction
import java.time.LocalDateTime

abstract class Bomber(
        val info: BomberInfo,
        var hp: Int,
        var x: Int,
        var y: Int)
{
        private val actions: Map<EnumAction, Action> = mutableMapOf()

        fun deployBomb() = Bomb(LocalDateTime.now(), Bomb.defaultFuse, x, y)
}
