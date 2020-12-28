package com.gogo.bakugejojo

import java.time.LocalDateTime

class Bomb(
        val deployed: LocalDateTime,
        val duration: Int,
        val x: Int,
        val y: Int
) {
    companion object {
        const val defaultFuse = 1000
    }
}
