package com.gogo.bakugejojo

class Bot(name: String, hp: Int, x: Int, y: Int, actions: Map<EnumAction,Action>)
    : Bomber(name, hp, x, y, actions) {}
