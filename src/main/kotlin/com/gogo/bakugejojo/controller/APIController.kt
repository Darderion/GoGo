package com.gogo.bakugejojo.controller

import com.gogo.bakugejojo.game.Server
import com.gogo.bakugejojo.game.lobby.Lobby
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
        val players = server.players.filter { it.id.toString() == token }
        if (players.isEmpty()) return ResponseEntity("Err:Invalid id", HttpStatus.OK)

        val player = players.first()
        val lobbies = server.lobbies.filter { !it.players.filter { it.account == player }.isEmpty() }
        if (lobbies.isEmpty()) return ResponseEntity("Err:Invalid lobby", HttpStatus.OK)

        val lobby = lobbies.first()
        if (!lobby.gameStarted)
            return ResponseEntity(
                "URL:lobby?token=${token}&lobby=${lobby.id}",
                HttpStatus.OK
            )
        return ResponseEntity("Err:No lobby", HttpStatus.OK)
    }

    @GetMapping("api/getLobbyInfo")
    fun getLobbyInfo(@RequestParam lobby: String): ResponseEntity<Lobby?> {
        val lobbies = server.lobbies.filter { it.id.toString() == lobby }
        if (lobbies.isEmpty()) return ResponseEntity(null, HttpStatus.OK)

        val curLobby = lobbies.first()
        if (!curLobby.gameStarted)
            return ResponseEntity(
                curLobby,
                HttpStatus.OK
            )
        return ResponseEntity(null, HttpStatus.OK)
    }
}