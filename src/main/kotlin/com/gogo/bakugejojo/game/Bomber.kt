package com.gogo.bakugejojo.game

import java.time.LocalDateTime

abstract class Bomber(
        val name: String,
        var hp: Int,
        var x: Int,
        var y: Int,
        private val actions: Map<EnumAction, Action>) {
    fun deployBomb() = Bomb(LocalDateTime.now(), Bomb.defaultFuse, x, y)
}
