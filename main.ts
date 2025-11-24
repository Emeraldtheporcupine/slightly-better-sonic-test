namespace SpriteKind {
    export const Collision = SpriteKind.create()
    export const RampLeft = SpriteKind.create()
    export const Ring = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Collision, function (sprite, otherSprite) {
    Sonic.y += -2
    Sonic.vy = 0
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Sonic.vy < 6 && Sonic.vy > -1) {
        Sonic.vy += -300
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Ring, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    music.setVolume(255)
    music.play(music.createSoundEffect(WaveShape.Square, 1, 2931, 255, 0, 50, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    music.play(music.createSoundEffect(WaveShape.Square, 1570, 3866, 255, 0, 50, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    music.play(music.createSoundEffect(WaveShape.Square, 2593, 5000, 255, 0, 50, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
})
let Direction = 0
let CollectRing: Sprite = null
let FLETgreen: Sprite = null
let mySprite3: Sprite = null
let mySprite2: Sprite = null
let Sonic: Sprite = null
scene.setBackgroundImage(assets.image`BackDrop`)
Sonic = sprites.create(assets.image`SonicIdleR`, SpriteKind.Player)
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(Sonic)
tiles.placeOnTile(Sonic, tiles.getTileLocation(1, 62))
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
for (let Place of tiles.getTilesByType(assets.tile`myTile3`)) {
    CollectRing = sprites.create(assets.image`blank`, SpriteKind.Ring)
    tiles.placeOnTile(CollectRing, Place)
    tiles.setTileAt(Place, assets.tile`transparency16`)
    animation.runImageAnimation(
    CollectRing,
    assets.animation`Ring`,
    100,
    true
    )
}
scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.BothDirections)
scroller.setCameraScrollingMultipliers(0.4, 0.4)
music.play(music.createSong(assets.song`Labyrinth`), music.PlaybackMode.LoopingInBackground)
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
