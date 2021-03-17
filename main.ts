function LED消灯 () {
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
}
function ICON表示 (No: number) {
    if (No == 1) {
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
    } else if (No == 2) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    } else if (No == 3) {
        basic.showLeds(`
            . # . # .
            # # # # #
            # # # # #
            . # # # .
            . . # . .
            `)
    } else {
        basic.showLeds(`
            . . # . .
            . # # # .
            . . # . .
            . # # # .
            . . # . .
            `)
    }
}
input.onButtonPressed(Button.A, function () {
    音量閾値 += -10
    led.plotBarGraph(
    音量閾値,
    255
    )
    basic.pause(1000)
    basic.clearScreen()
})
function モーターON () {
    pins.digitalWritePin(DigitalPin.P2, 1)
}
function LED点灯 () {
    strip.setPixelColor((input.runningTime() / 200 + 0) % 4, neopixel.colors(NeoPixelColors.Red))
    strip.setPixelColor((input.runningTime() / 200 + 1) % 4, neopixel.colors(NeoPixelColors.Orange))
    strip.setPixelColor((input.runningTime() / 200 + 2) % 4, neopixel.colors(NeoPixelColors.Green))
    strip.setPixelColor((input.runningTime() / 200 + 3) % 4, neopixel.colors(NeoPixelColors.Yellow))
    strip.show()
}
input.onButtonPressed(Button.AB, function () {
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
    モーターOFF()
    ICON表示(モード)
})
radio.onReceivedString(function (receivedString) {
    if (receivedString.includes("A")) {
        LED点灯()
    } else {
        LED消灯()
    }
    if (モード != 2) {
        if (receivedString.includes("B")) {
            モーターON()
        } else {
            モーターOFF()
        }
    }
})
input.onButtonPressed(Button.B, function () {
    音量閾値 += 10
    led.plotBarGraph(
    音量閾値,
    255
    )
    basic.pause(1000)
    basic.clearScreen()
})
function モーターOFF () {
    pins.digitalWritePin(DigitalPin.P2, 0)
}
let 前回送信文字列 = ""
let 今回送信文字列 = ""
let motoron = false
let モード = 0
let 音量閾値 = 0
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P1, 4, NeoPixelMode.RGB)
LED消灯()
radio.setGroup(33)
if (input.buttonIsPressed(Button.A)) {
    音量閾値 = 255
    モード = 1
} else if (input.buttonIsPressed(Button.B)) {
    音量閾値 = 128
    モード = 2
} else {
    音量閾値 = 128
    モード = 0
}
radio.setGroup(33)
ICON表示(モード)
while (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
	
}
basic.forever(function () {
    let motorlimit = 0
    if (motoron && input.runningTime() > motorlimit) {
        モーターOFF()
        LED消灯()
        motoron = false
    }
    今回送信文字列 = ""
    if (モード != 1) {
        if (今回送信文字列 != "" || 前回送信文字列 != "") {
            radio.sendString(今回送信文字列)
            前回送信文字列 = 今回送信文字列
        }
    }
    basic.pause(0 / 10)
})
