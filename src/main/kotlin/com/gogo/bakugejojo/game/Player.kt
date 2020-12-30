package com.gogo.bakugejojo.game

class Player(
        name: String,
        hp: Int,
        x: Int,
        y: Int,
        actions: Map<EnumAction, Action>)
    : Bomber(name, hp, x, y, actions)
