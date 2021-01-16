package com.gogo.bakugejojo.controller

import com.gogo.bakugejojo.game.Account
import com.gogo.bakugejojo.game.Server
import com.gogo.bakugejojo.game.bomber.Character
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
    fun getTokenURL(@RequestParam token: String): ResponseEntity<String> {
        val lobby: Lobby
        try {
            val player = server.findPlayer { it.id.toString() == token }
            lobby = server.findLobby { it.players.filter { it.account.id == player.id }.isNotEmpty() }
            if (lobby.gameStarted) return ResponseEntity("Err:GameStarted", HttpStatus.OK)
        } catch (e: Exception) {
            return ResponseEntity("Err:${e.message}", HttpStatus.OK)
        }
        return ResponseEntity(
            "URL:lobby?token=${token}&lobby=${lobby.id}",
            HttpStatus.OK
        )
    }

    @GetMapping("api/getLobbyInfo")
    fun getLobbyInfo(@RequestParam lobbyId: String): ResponseEntity<Lobby?> {
        val lobby: Lobby
        try {
            lobby = server.findLobby { it.id.toString() == lobbyId }
        } catch (e: Exception) {
            return ResponseEntity(null as Lobby?, HttpStatus.OK)
        }
        return if (!lobby.gameStarted)
            ResponseEntity(lobby, HttpStatus.OK)
        else
			ResponseEntity(null as Lobby?, HttpStatus.OK)
    }

    @GetMapping("api/moveCharacterSelector")
    fun moveSelector(
        @RequestParam lobbyId: String,
        @RequestParam token: String,
        @RequestParam character: String
        ) : ResponseEntity<String> {
        val lobby: Lobby
        val player: Account
        val characterVal: Character
        try {
            characterVal = Character.valueOf(character)
            player = server.findPlayer { it.id.toString() == token }
            lobby = server.findLobby { it.players.filter { it.account.id == player.id }.isNotEmpty() }
            if (lobby.gameStarted) return ResponseEntity("Err:GameStarted", HttpStatus.OK)
        } catch (e: Exception) {
            return ResponseEntity("Err:${e.message}", HttpStatus.OK)
        }
        lobby.players.filter { it.account.id == player.id }.first().character = characterVal
        return ResponseEntity("Response:${lobby.players.filter { it.account.id == player.id }.first().character}", HttpStatus.OK)
    }
}