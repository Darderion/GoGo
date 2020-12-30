package com.gogo.bakugejojo.game

import java.time.Instant
import java.time.LocalDateTime

class Action(
        val cooldown: Int,
        var previousOccurence: LocalDateTime = LocalDateTime.from(Instant.MIN))
