let animations;

window.addEventListener('DOMContentLoaded', () => {
    SpriteSheetRenderer.init("canvas");

    SpriteSheetRenderer.addSpriteSheetAnimation(
        "heroidle", "heroidle.png", 64, 64, 8, 6
    );
    SpriteSheetRenderer.addSpriteSheetAnimation(
        "pirateIdle", "pirate1idle.png", 32, 32, 6, 6
    );

    SpriteSheetRenderer.loadAnimations((result) => { animations = result });
});


function runAnimation(an, cx, cy) {
    iid = setInterval(() => {
        var ctx = document.getElementById('canvas').getContext('2d');
        ctx.clearRect(0, 0, 400, 400);
        ctx.save();
        an.render(cx, cy);
        ctx.restore();
    }, 16.3333);
}
    