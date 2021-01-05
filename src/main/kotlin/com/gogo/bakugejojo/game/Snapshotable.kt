package com.gogo.bakugejojo.game

import java.lang.Exception

interface Snapshotable {
    // This interface indicates that a class that implements it can represent
    //  it's state in a form of an INT array
    //  [ SIZE, ... ]

    fun getSnapshot(): List<Int>
    fun setSnapshot(snapshot: List<Int>)
    fun snapshotSize(): Int

    fun List<Snapshotable>.getSnapshot() =
        arrayOf(this.size) + this.map { it.getSnapshot() }.flatten()

    fun List<Snapshotable>.setSnapshot(snapshots: List<Int>) {
        if (snapshots.isEmpty()) throw Exception("Empty snapshot")
        val size = snapshots[0]
        if (size != this.size) throw Exception("List and it's snapshot have different sizes")
        var currentPosition = 1
        for(i in 1..size) {
            val itemSize = snapshots[currentPosition]
            val snapshot = snapshots.subList(currentPosition, currentPosition + 1 + itemSize)
            this[i - 1].setSnapshot(snapshot)
            currentPosition += 1 + itemSize
        }
    }

    fun List<Snapshotable>.snapshotSize() = this.fold(1) { acc, snapshotable ->
        acc + snapshotable.snapshotSize()
    }
}