package com.gogo.bakugejojo.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class APIController {
    @PostMapping("/api/update")
    fun update(): ResponseEntity<String> {
        return ResponseEntity("someText", HttpStatus.OK)
    }
}