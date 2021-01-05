package com.gogo.bakugejojo.game

class Bomb(
    var duration: Int,
    var x: Int,
    var y: Int
) : Snapshotable {
    var deployed: Int = 0

    fun deploy(deployment: Int): Bomb {
        deployed = deployment
        return this
    }

    companion object {
        const val defaultFuse = 1000
    }

    override fun getSnapshot() = listOf(this.snapshotSize(), deployed, duration, x, y)

    override fun setSnapshot(snapshot: List<Int>) {
        deployed = snapshot[1]
        duration = snapshot[2]
        x = snapshot[3]
        y = snapshot[4]
    }

    override fun snapshotSize() = 4
}
