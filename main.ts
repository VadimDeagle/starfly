namespace SpriteKind {
    export const Star = SpriteKind.create()
    export const Emerg = SpriteKind.create()
    export const Cannon = SpriteKind.create()
    export const Bb = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (BbOn) {
        MeteorArray = sprites.allOfKind(SpriteKind.Enemy)
        for (let value of MeteorArray) {
            value.destroy(effects.fire, 200)
            info.changeScoreBy(1)
        }
        scene.cameraShake(4, 100)
        BbOn = false
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    timer.throttle("action", 500, function () {
        if (CannonOn) {
            projectile = sprites.createProjectileFromSprite(img`
                . . 1 1 1 . . . . 
                5 5 5 1 1 1 1 1 1 
                . . 1 1 1 . . . . 
                . . . . . . . . . 
                . . . . . . . . . 
                . . . . . . . . . 
                . . . . . . . . . 
                . . 1 1 1 . . . . 
                5 5 5 1 1 1 1 1 1 
                . . 1 1 1 . . . . 
                `, mySprite, 150, 0)
        } else {
            projectile = sprites.createProjectileFromSprite(img`
                . . 1 1 1 . . . . 
                5 5 5 1 1 1 1 1 1 
                . . 1 1 1 . . . . 
                `, mySprite, 100, 0)
        }
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Emerg, function (sprite, otherSprite) {
    otherSprite.destroy(effects.hearts, 200)
    info.changeLifeBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bb, function (sprite, otherSprite) {
    otherSprite.destroy(effects.rings, 200)
    BbOn = true
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Emerg, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 200)
    sprite.destroy(effects.fire, 1)
    info.changeScoreBy(10)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Cannon, function (sprite, otherSprite) {
    otherSprite.destroy(effects.rings, 200)
    CannonOn = true
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 200)
    sprite.destroy(effects.fire, 1)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 200)
    CannonOn = false
    info.changeLifeBy(-1)
})
let Emergensy: Sprite = null
let Star: Sprite = null
let Meteor: Sprite = null
let projectile: Sprite = null
let MeteorArray: Sprite[] = []
let mySprite: Sprite = null
let CannonOn = false
let BbOn = false
info.setLife(5)
BbOn = false
CannonOn = false
let MeteorImages = [
img`
    . . . . . . . . c c c c . . . . 
    . . . . c c c c c c c c c . . . 
    . . . c f c c a a a a c a c . . 
    . . c c f f f f a a a c a a c . 
    . . c c a f f c a a f f f a a c 
    . . c c a a a a b c f f f a a c 
    . c c c c a c c b a f c a a c c 
    c a f f c c c a b b 6 b b b c c 
    c a f f f f c c c 6 b b b a a c 
    c a a c f f c a 6 6 b b b a a c 
    c c b a a a a b 6 b b a b b a . 
    . c c b b b b b b b a c c b a . 
    . . c c c b c c c b a a b c . . 
    . . . . c b a c c b b b c . . . 
    . . . . c b b a a 6 b c . . . . 
    . . . . . . b 6 6 c c . . . . . 
    `,
img`
    . . . . . . . c c c a c . . . . 
    . . c c b b b a c a a a c . . . 
    . c c a b a c b a a a b c c . . 
    . c a b c f f f b a b b b a . . 
    . c a c f f f 8 a b b b b b a . 
    . c a 8 f f 8 c a b b b b b a . 
    c c c a c c c c a b c f a b c c 
    c c a a a c c c a c f f c b b a 
    c c a b 6 a c c a f f c c b b a 
    c a b c 8 6 c c a a a b b c b c 
    c a c f f a c c a f a c c c b . 
    c a 8 f c c b a f f c b c c c . 
    . c b c c c c b f c a b b a c . 
    . . a b b b b b b b b b b b c . 
    . . . c c c c b b b b b c c . . 
    . . . . . . . . c b b c . . . . 
    `,
img`
    . . . . . . c c c . . . . . . . 
    . . . . . a a a c c c . . . . . 
    . . . c a c f a a a a c . . . . 
    . . c a c f f f a f f a c . . . 
    . c c a c c f a a c f f a c . . 
    . a b a a c 6 a a c c f a c c c 
    . a b b b 6 a b b a a c a f f c 
    . . a b b a f f b b a a c f f c 
    c . a a a c c f c b a a c f a c 
    c c a a a c c a a a b b a c a c 
    a c a b b a a 6 a b b 6 b b c . 
    b a c b b b 6 b c . c c a c . . 
    b a c c a b b a c . . . . . . . 
    b b a c a b a a . . . . . . . . 
    a b 6 b b a c . . . . . . . . . 
    . a a b c . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . c c 8 . . . . 
    . . . . . . 8 c c c f 8 c c . . 
    . . . c c 8 8 f c a f f f c c . 
    . . c c c f f f c a a f f c c c 
    8 c c c f f f f c c a a c 8 c c 
    c c c b f f f 8 a c c a a a c c 
    c a a b b 8 a b c c c c c c c c 
    a f c a a b b a c c c c c f f c 
    a 8 f c a a c c a c a c f f f c 
    c a 8 a a c c c c a a f f f 8 a 
    . a c a a c f f a a b 8 f f c a 
    . . c c b a f f f a b b c c 6 c 
    . . . c b b a f f 6 6 a b 6 c . 
    . . . c c b b b 6 6 a c c c c . 
    . . . . c c a b b c c c . . . . 
    . . . . . c c c c c c . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . c c c c . . 
    . c c c c c . c c c c c f c c . 
    c c a c c c c c 8 f f c f f c c 
    c a f a a c c a f f c a a f f c 
    c a 8 f a a c a c c c a a a a c 
    c b c f a a a a a c c c c c c c 
    c b b a a c f 8 a c c c 8 c c c 
    . c b b a b c f a a a 8 8 c c . 
    . . . . a a b b b a a 8 a c . . 
    . . . . c b c a a c c b . . . . 
    . . . . b b c c a b b a . . . . 
    . . . . b b a b a 6 a . . . . . 
    . . . . c b b b 6 6 c . . . . . 
    . . . . . c a 6 6 b c . . . . . 
    . . . . . . . c c c . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . c c . . . . . . . . 
    . . . . c a f b c . . . . . . . 
    . . . . b f f b c c . . . . . . 
    . . . a a f b a b a c . . . . . 
    . . . c a c b b f f b . . . . . 
    . . . . b f f b f a b . . . . . 
    . . . . a f f b b b a . . . . . 
    . . . . . a b b c c . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . c c c . . . . . . 
    . . . . . . a b a a . . . . . . 
    . . . . . c b a f c a c . . . . 
    . . . . c b b b f f a c c . . . 
    . . . . b b f a b b a a c . . . 
    . . . . c b f f b a f c a . . . 
    . . . . . c a a c b b a . . . . 
    . . . . . . c c c c . . . . . . 
    . . . . . . . c . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . c c c . . . . . . 
    . . . . . c a 6 6 b c . . . . . 
    . . . . c b b b 6 6 c . . . . . 
    . . . . b b a b a 6 a . . . . . 
    . . . . b b c c a b b a . . . . 
    . . . . c b c a a c c b . . . . 
    . . . . a a b b b a a 8 a c . . 
    . c b b a b c f a a a 8 8 c c . 
    c b b a a c f 8 a c c c 8 c c c 
    c b c f a a a a a c c c c c c c 
    c a 8 f a a c a c c c a a a a c 
    c a f a a c c a f f c a a f f c 
    c c a c c c c c 8 f f c f f c c 
    . c c c c c . c c c c c f c c . 
    . . . . . . . . . . c c c c . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . a a b c . . . . . . . . . . . 
    a b 6 b b a c . . . . . . . . . 
    b b a c a b a a . . . . . . . . 
    b a c c a b b a c . . . . . . . 
    b a c b b b 6 b c . c c a c . . 
    a c a b b a a 6 a b b 6 b b c . 
    c c a a a c c a a a b b a c a c 
    c . a a a c c f c b a a c f a c 
    . . a b b a f f b b a a c f f c 
    . a b b b 6 a b b a a c a f f c 
    . a b a a c 6 a a c c f a c c c 
    . c c a c c f a a c f f a c . . 
    . . c a c f f f a f f a c . . . 
    . . . c a c f a a a a c . . . . 
    . . . . . a a a c c c . . . . . 
    . . . . . . c c c . . . . . . . 
    `,
img`
    . . . . . . b 6 6 c c . . . . . 
    . . . . c b b a a 6 b c . . . . 
    . . . . c b a c c b b b c . . . 
    . . c c c b c c c b a a b c . . 
    . c c b b b b b b b a c c b a . 
    c c b a a a a b 6 b b a b b a . 
    c a a c f f c a 6 6 b b b a a c 
    c a f f f f c c c 6 b b b a a c 
    c a f f c c c a b b 6 b b b c c 
    . c c c c a c c b a f c a a c c 
    . . c c a a a a b c f f f a a c 
    . . c c a f f c a a f f f a a c 
    . . c c f f f f a a a c a a c . 
    . . . c f c c a a a a c a c . . 
    . . . . c c c c c c c c c . . . 
    . . . . . . . . c c c c . . . . 
    `
]
mySprite = sprites.create(img`
    ......11111111..............
    ........b1111111b...........
    ........b1111111b...........
    ........1111111a111111......
    .....444411aaaa1888881111...
    ...44444411aaaa1899991111...
    222222222aa11111119998881111
    ...44444411aaaa1899991111...
    .....444411aaaa1888881111...
    ........1111111a111111......
    ........c1111111c...........
    ........c1111111c...........
    ......11111111..............
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(50, function () {
    if (Math.percentChance(50)) {
        mySprite.setImage(img`
            ......11111111..............
            ........b11111117...........
            ........b1111111b...........
            ........1111111a111111......
            .....555511aaaa1888881111...
            ...44444411aaaa1899991111...
            .....2222aa11111119998881111
            ...44444411aaaa1899991111...
            .....555511aaaa1888881111...
            ........1111111a111111......
            ........c1111111c...........
            ........c11111117...........
            ......11111111..............
            `)
    } else {
        mySprite.setImage(img`
            ......11111111..............
            ........b11111112...........
            ........b1111111b...........
            ........1111111a111111......
            .....444411aaaa1888881111...
            ...44444411aaaa1899991111...
            222222222aa11111119998881111
            ...44444411aaaa1899991111...
            .....444411aaaa1888881111...
            ........1111111a111111......
            ........c1111111c...........
            ........c11111112...........
            ......11111111..............
            `)
    }
})
game.onUpdateInterval(500, function () {
    if (Math.percentChance(60)) {
        Meteor = sprites.create(MeteorImages[randint(0, MeteorImages.length - 1)], SpriteKind.Enemy)
        Meteor.setPosition(160, randint(10, 110))
        Meteor.setVelocity(randint(-30, -50 - info.score()), randint(-3, 3))
        Meteor.setFlag(SpriteFlag.AutoDestroy, true)
    }
    Star = sprites.create(img`
        1 
        `, SpriteKind.Star)
    Star.setVelocity(randint(-5, -50 - info.score()), 0)
    Star.setPosition(160, randint(0, 120))
    Star.setFlag(SpriteFlag.AutoDestroy, true)
    Star.setFlag(SpriteFlag.Ghost, true)
    if (Math.percentChance(3)) {
        Emergensy = sprites.create(img`
            . . . . . . . . . e e 2 . . . . 
            . . . . . . 2 e e e 5 2 e e . . 
            . . . e e 2 2 5 e 2 5 5 5 e e . 
            . . e e e 5 5 5 e 2 2 5 5 e e e 
            2 e e e 5 5 5 5 e e 2 2 2 2 e e 
            e e e 4 5 5 5 2 2 e e 2 2 2 e e 
            e 2 2 4 4 2 2 4 e e e e e e e e 
            2 5 e 2 2 4 4 2 e e e e e 5 5 e 
            2 2 5 e 2 2 e e 2 e 2 e 5 5 5 e 
            e 2 2 2 2 e e e e 2 2 5 5 5 2 2 
            . 2 e 2 2 e 5 5 2 2 4 2 5 5 e 2 
            . . e e 4 2 5 5 5 2 4 4 e e 2 e 
            . . . e 4 4 2 5 5 2 2 2 4 2 e . 
            . . . e e 4 4 4 2 2 2 e e e e . 
            . . . . e e 2 4 4 e e e . . . . 
            . . . . . e e e e e e . . . . . 
            `, SpriteKind.Emerg)
        Emergensy.setPosition(160, randint(10, 110))
        Emergensy.setVelocity(randint(-20, -50 - info.score()), randint(-3, 3))
        Emergensy.setFlag(SpriteFlag.AutoDestroy, true)
    }
    if (Math.percentChance(1)) {
        Emergensy = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 4 4 4 . . . . . . 
            . . . . 4 4 4 5 5 4 4 4 . . . . 
            . . . 3 3 3 3 4 4 4 4 4 4 . . . 
            . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
            . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
            . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
            . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
            . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
            . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
            . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
            . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
            . . . 4 2 2 2 2 2 2 2 2 4 . . . 
            . . . . 4 4 2 2 2 2 4 4 . . . . 
            . . . . . . 4 4 4 4 . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Cannon)
        Emergensy.setPosition(160, randint(10, 110))
        Emergensy.setVelocity(randint(-20, -50 - info.score()), randint(-3, 3))
        Emergensy.setFlag(SpriteFlag.AutoDestroy, true)
    }
    if (Math.percentChance(1)) {
        Emergensy = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 6 6 6 6 . . . . . . 
            . . . . 6 6 6 5 5 6 6 6 . . . . 
            . . . 7 7 7 7 6 6 6 6 6 6 . . . 
            . . 6 7 7 7 7 8 8 8 1 1 6 6 . . 
            . . 7 7 7 7 7 8 8 8 1 1 5 6 . . 
            . 6 7 7 7 7 8 8 8 8 8 5 5 6 6 . 
            . 6 7 7 7 8 8 8 6 6 6 6 5 6 6 . 
            . 6 6 7 7 8 8 6 6 6 6 6 6 6 6 . 
            . 6 8 7 7 8 8 6 6 6 6 6 6 6 6 . 
            . . 6 8 7 7 8 6 6 6 6 6 8 6 . . 
            . . 6 8 8 7 8 8 6 6 6 8 6 6 . . 
            . . . 6 8 8 8 8 8 8 8 8 6 . . . 
            . . . . 6 6 8 8 8 8 6 6 . . . . 
            . . . . . . 6 6 6 6 . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Bb)
        Emergensy.setPosition(160, randint(10, 110))
        Emergensy.setVelocity(randint(-20, -50 - info.score()), randint(-3, 3))
        Emergensy.setFlag(SpriteFlag.AutoDestroy, true)
    }
})
