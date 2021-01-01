package com.gogo.bakugejojo.game.bomber

import com.gogo.bakugejojo.game.Action
import com.gogo.bakugejojo.game.EnumAction

class Player(
        info: BomberInfo,
        hp: Int,
        x: Int,
        y: Int)
    : Bomber(info, hp, x, y)
