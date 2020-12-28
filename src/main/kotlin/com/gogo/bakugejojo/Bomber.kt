package com.gogo.bakugejojo

abstract class Bomber(val name: String, var hp: Int, var x: Int, var y: Int, private val actions: Map<EnumAction,Action>) {}
