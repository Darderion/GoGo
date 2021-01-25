package com.gogo.bakugejojo.game.bomber

import com.gogo.bakugejojo.game.Account

class Player(
	info: BomberInfo,
	hp: Int,
	x: Int,
	y: Int,
	val account: Account
) : Bomber(info, hp, x, y)
