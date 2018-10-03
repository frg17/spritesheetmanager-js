let sprite1;

window.addEventListener('DOMContentLoaded', () => {
    SpriteSheetRenderer.init("canvas");

    SpriteSheetRenderer.createSpriteFromSpriteSheet(
        "pirate1idle.png",
        32, 32, 6, (result) => {
            console.log("Donezel washington");
            sprite1 = result;
        }
    )
});

