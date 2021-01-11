package com.gogo.bakugejojo

import com.gogo.bakugejojo.game.Server
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class AppConfig {
	@Bean
	fun server() = Server()
}