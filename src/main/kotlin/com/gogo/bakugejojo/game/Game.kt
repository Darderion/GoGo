package com.gogo.bakugejojo.game

import com.gogo.bakugejojo.game.bomber.Bomber
import com.gogo.bakugejojo.game.map.BattleMap

class Game(
    private val map: BattleMap,
    private val bombers: Array<Bomber>,
    private val bombs: MutableList<Bomb> = mutableListOf()) {
    fun restart() {
        map.restart()
        bombs.clear()
    }
}
