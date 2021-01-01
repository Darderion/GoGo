package com.gogo.bakugejojo

import com.gogo.bakugejojo.controller.HomeController
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class BakugejojoApplicationTests {

	@Autowired
	lateinit var homeController: HomeController

	@Test
	fun contextLoads() {
		homeController.home() shouldBe "index"
	}

}
