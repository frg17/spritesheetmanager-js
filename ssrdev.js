let sprite1;
let sprite2;

window.addEventListener('DOMContentLoaded', () => {
    SpriteSheetRenderer.init("canvas");

    SpriteSheetRenderer.createSpriteFromSpriteSheet(
        "pirate1idle.png", 32, 32, 6,
        (result) => { sprite1 = result;}
    );

    SpriteSheetRenderer.createSpriteFromSpriteSheet(
        "heroidle.png", 64, 64, 8, 
        (result) => { sprite2 = result }
    );
});