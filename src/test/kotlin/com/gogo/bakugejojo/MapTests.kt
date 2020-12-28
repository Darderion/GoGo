package com.gogo.bakugejojo

import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.*
import io.kotest.matchers.string.startWith

class MyTests : StringSpec({
    "length should return size of string" {
        "diego".length shouldBe 5
    }
    "startsWith should test for a prefix" {
        "diego" should startWith("d")
    }
})