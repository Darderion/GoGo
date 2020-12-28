package com.gogo.bakugejojo

class BattleField(
        val map: BattleMap,
        val bombers: Array<Bomber>,
        val bombs: MutableList<Bomb>) {
    fun restart() {
        map.restart()
        bombs.clear()
    }
}
