controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Sonic.vy < 6 && Sonic.vy > -1) {
        Sonic.vy += -200
    }
})
let Direction = 0
let Sonic: Sprite = null
Sonic = sprites.create(assets.image`SonicIdleR`, SpriteKind.Player)
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(Sonic)
tiles.placeOnTile(Sonic, tiles.getTileLocation(1, 8))
Sonic.ay = 400
game.onUpdate(function () {
    Sonic.vy += 5
    if (controller.right.isPressed()) {
        Direction = 1
        Sonic.vx += 2
    } else if (controller.left.isPressed()) {
        Direction = -1
        Sonic.vx += -2
    } else {
        Sonic.vx += Sonic.vx * -0.15
    }
    if (Direction == 1) {
        Sonic.setImage(assets.image`SonicIdleR`)
    } else if (Direction == -1) {
        Sonic.setImage(assets.image`SonicIdleL`)
    }
    if (Sonic.vx > 175) {
        Sonic.vx = 175
    } else if (Sonic.vx < -175) {
        Sonic.vx = -175
    }
})
