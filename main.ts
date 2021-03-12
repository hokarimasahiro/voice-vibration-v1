radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        LEDバイブ(50)
    } else if (receivedNumber == 2) {
        LEDバイブ(50)
        basic.pause(50)
        LEDバイブ(50)
    } else if (receivedNumber == 3) {
        LEDバイブ(50)
        basic.pause(50)
        LEDバイブ(50)
        basic.pause(50)
        LEDバイブ(50)
    } else {
    	
    }
})
input.onButtonPressed(Button.A, function () {
    if (モード == 0) {
        LED点灯()
        basic.showString("A")
    } else if (モード == 1) {
        radio.sendNumber(1)
    } else if (モード == 2) {
    	
    }
})
input.onGesture(Gesture.Shake, function () {
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
    if (モード == 0) {
        basic.showIcon(IconNames.Happy)
    } else if (モード == 1) {
        basic.showIcon(IconNames.Heart)
    } else if (モード == 2) {
        basic.showIcon(IconNames.SmallHeart)
    }
})
function LEDバイブ (mS: number) {
    LED点灯()
    バイブ(mS)
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
}
input.onButtonPressed(Button.AB, function () {
    if (モード == 0) {
    	
    } else if (モード == 1) {
        radio.sendNumber(3)
    } else if (モード == 2) {
    	
    }
})
input.onButtonPressed(Button.B, function () {
    if (モード == 0) {
        バイブ(50)
        basic.showString("B")
    } else if (モード == 1) {
        radio.sendNumber(2)
    } else if (モード == 2) {
    	
    }
})
function LED点灯 () {
    strip.setPixelColor((n + 0) % 4, neopixel.colors(NeoPixelColors.Red))
    strip.setPixelColor((n + 1) % 4, neopixel.colors(NeoPixelColors.Green))
    strip.setPixelColor((n + 2) % 4, neopixel.colors(NeoPixelColors.Yellow))
    strip.setPixelColor((n + 3) % 4, neopixel.colors(NeoPixelColors.Blue))
    strip.show()
    n += 1
}
function バイブ (mS: number) {
    pins.digitalWritePin(DigitalPin.P2, 1)
    basic.pause(mS)
    pins.digitalWritePin(DigitalPin.P2, 0)
}
let n = 0
let モード = 0
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P1, 4, NeoPixelMode.RGB)
strip.showColor(neopixel.colors(NeoPixelColors.Black))
radio.setGroup(33)
if (input.buttonIsPressed(Button.A)) {
    モード = 1
    basic.showIcon(IconNames.Heart)
} else if (input.buttonIsPressed(Button.B)) {
    モード = 2
    basic.showIcon(IconNames.SmallHeart)
} else {
    モード = 0
    basic.showIcon(IconNames.Happy)
}
n = 0
