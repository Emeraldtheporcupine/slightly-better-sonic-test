namespace SpriteKind {
    export const Collision = SpriteKind.create()
    export const RampLeft = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Collision, function (sprite, otherSprite) {
    Sonic.y += -2
    Sonic.vy = 0
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Sonic.vy < 6 && Sonic.vy > -1) {
        Sonic.vy += -250
    }
})
let Direction = 0
let FLETgreen: Sprite = null
let mySprite3: Sprite = null
let mySprite2: Sprite = null
let Sonic: Sprite = null
Sonic = sprites.create(assets.image`SonicIdleR`, SpriteKind.Player)
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(Sonic)
tiles.placeOnTile(Sonic, tiles.getTileLocation(1, 14))
Sonic.ay = 400
for (let SlopeUpRight of tiles.getTilesByType(assets.tile`myTile`)) {
    mySprite2 = sprites.create(assets.image`rampRight`, SpriteKind.Collision)
    tiles.placeOnTile(mySprite2, SlopeUpRight)
    tiles.setTileAt(SlopeUpRight, assets.tile`transparency16`)
}
for (let SlopeUpLeft of tiles.getTilesByType(assets.tile`myTile0`)) {
    mySprite3 = sprites.create(assets.image`rampLeft`, SpriteKind.Collision)
    tiles.placeOnTile(mySprite3, SlopeUpLeft)
    tiles.setTileAt(SlopeUpLeft, assets.tile`transparency16`)
}
for (let Place of tiles.getTilesByType(assets.tile`myTile1`)) {
    FLETgreen = sprites.create(assets.image`FlatGREN`, SpriteKind.Collision)
    tiles.placeOnTile(FLETgreen, Place)
    tiles.setTileAt(Place, assets.tile`transparency16`)
}
music.play(music.createSong(assets.song`Test`), music.PlaybackMode.LoopingInBackground)
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
        Sonic.setImage(assets.image`SonicIdleL0`)
    }
    if (Sonic.vx > 175) {
        Sonic.vx = 175
    } else if (Sonic.vx < -175) {
        Sonic.vx = -175
    }
})
