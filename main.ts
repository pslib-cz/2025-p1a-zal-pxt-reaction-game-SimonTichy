enum GameState {
    Passive,
    Started,
    Running
}

let state: GameState = GameState.Passive

function drawHourglass() {
    basic.clearScreen()
    led.plot(0, 0); led.plot(1, 0); led.plot(2, 0); led.plot(3, 0); led.plot(4, 0)
    led.plot(1, 1); led.plot(2, 1); led.plot(3, 1)
    led.plot(2, 2)
    led.plot(1, 3); led.plot(2, 3); led.plot(3, 3)
    led.plot(0, 4); led.plot(1, 4); led.plot(2, 4); led.plot(3, 4); led.plot(4, 4)
}

input.onButtonPressed(Button.AB, function () {
    if (state === GameState.Passive) {
        state = GameState.Started
        drawHourglass()

        control.runInBackground(() => {
            music.playTone(440, 200)
        })

        let waitTime = randint(3, 6)
        basic.pause(waitTime * 1000)

        let earlyA = input.buttonIsPressed(Button.A)
        let earlyB = input.buttonIsPressed(Button.B)

        if (earlyA || earlyB) {
            state = GameState.Passive
            if (earlyA && earlyB) {
                basic.showIcon(IconNames.Sad)
                music.playTone(131, 500)
            } else if (earlyA) {
                basic.showString("B")
                music.playTone(523, 500)
            } else {
                basic.showString("A")
                music.playTone(523, 500)
            }
            basic.pause(2000)
            basic.clearScreen()
        } else {
            runGame()
        }
    }
})

function runGame() {
    state = GameState.Running
    basic.showIcon(IconNames.Pitchfork)

    control.runInBackground(() => {
        music.playTone(880, 200)
    })

    while (state === GameState.Running) {
        let pA = input.buttonIsPressed(Button.A)
        let pB = input.buttonIsPressed(Button.B)

        if (pA && pB) {
            state = GameState.Passive
            basic.showIcon(IconNames.Square)
            music.playTone(330, 500)
        } else if (pA) {
            state = GameState.Passive
            basic.showString("A")
            music.playTone(523, 500)
        } else if (pB) {
            state = GameState.Passive
            basic.showString("B")
            music.playTone(523, 500)
        }
        basic.pause(20)
    }

    basic.pause(2000)
    basic.clearScreen()
}
