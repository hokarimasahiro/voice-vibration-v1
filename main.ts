function LED消灯 () {
    LED.showColor(neopixel.colors(NeoPixelColors.Black))
}
function ICON表示 (ICON番号: number) {
    if (ICON番号 == 1) {
        basic.showLeds(`
            . # # . .
            # . . # .
            # # # # .
            # . . # .
            # . . # .
            `)
    } else if (ICON番号 == 2) {
        basic.showLeds(`
            # # # . .
            # . . # .
            # # # . .
            # . . # .
            # # # . .
            `)
    } else {
        basic.clearScreen()
    }
}
input.onButtonPressed(Button.A, function () {
    radio.sendString("A")
})
function モーターON () {
    pins.digitalWritePin(DigitalPin.P2, 1)
}
function コマンド処理 (コマンド: string) {
    if (コマンド.includes("A")) {
        モーターON()
        LED点灯()
        ICON表示(1)
    } else if (コマンド.includes("B")) {
        モーターON()
        LED点灯()
        ICON表示(2)
    }
    動作中 = true
    終了時刻 = input.runningTime() + 動作時間
}
input.onGesture(Gesture.Shake, function () {
    LED消灯()
    モーターOFF()
    動作中 = false
})
function LED点灯 () {
    LED.setPixelColor((input.runningTime() / 200 + 0) % 4, neopixel.colors(NeoPixelColors.Red))
    LED.setPixelColor((input.runningTime() / 200 + 1) % 4, neopixel.colors(NeoPixelColors.Orange))
    LED.setPixelColor((input.runningTime() / 200 + 2) % 4, neopixel.colors(NeoPixelColors.Green))
    LED.setPixelColor((input.runningTime() / 200 + 3) % 4, neopixel.colors(NeoPixelColors.Yellow))
    LED.show()
}
input.onButtonPressed(Button.AB, function () {
    serial.writeLine("" + control.deviceName() + "," + bit.numberToHex(control.deviceSerialNumber()))
})
radio.onReceivedString(function (receivedString) {
    QUEUE.push(receivedString)
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("B")
})
function モーターOFF () {
    pins.digitalWritePin(DigitalPin.P2, 0)
}
let QUEUE: string[] = []
let 動作中 = false
let 終了時刻 = 0
let 動作時間 = 0
let LED: neopixel.Strip = null
LED = neopixel.create(DigitalPin.P1, 4, NeoPixelMode.RGB)
LED消灯()
radio.setGroup(33)
動作時間 = 200
終了時刻 = input.runningTime()
動作中 = false
serial.redirectToUSB()
QUEUE = []
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    if (QUEUE.length > 0) {
        コマンド処理(QUEUE[0])
        QUEUE.shift()
    }
    if (動作中 && input.runningTime() > 終了時刻) {
        モーターOFF()
        LED消灯()
        動作中 = false
    }
    basic.pause(10)
})
