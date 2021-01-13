package com.gogo.bakugejojo.controller

import com.gogo.bakugejojo.game.Server
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class APIController {
    var id = 0
    @Autowired
    lateinit var server: Server

    @PostMapping("/api/update")
    fun update(): ResponseEntity<String> {
        return ResponseEntity("someText", HttpStatus.OK)
    }

    @GetMapping("/api/getToken")
    fun getToken(): ResponseEntity<String> {
        id = (id + 1) % server.players.size
        return ResponseEntity(
            id.toString(),
            HttpStatus.OK)
    }

    @GetMapping("api/getTokenURL")
    fun getGameInfo(@RequestParam token: String): ResponseEntity<String> {
        var text = ""
        val players = server.players.filter { it.id.toString() == token }
        if (players.isEmpty()) {
            text = "Err:Invalid id"
        } else {
            val player = players.first()
            val lobbies = server.lobbies.filter { it.players.containsKey(player) }
            if (lobbies.isEmpty()) {
                text = "Err:Invalid lobby"
            } else {
                val lobby = lobbies.first()
                if (!lobby.gameStarted) {
                    text = "URL:lobby?token=${token}&lobby=${lobby.id}"
                }
            }
        }
        return ResponseEntity(text, HttpStatus.OK)
    }
}