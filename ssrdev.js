let animations;
let ctx;
let an;


window.addEventListener('DOMContentLoaded', () => {
    ctx = document.getElementById('canvas').getContext('2d');
    
    //Add resources for renderer to create animations from
    SpriteSheetRenderer.addSpriteSheetAnimation(
        "heroidle", "https://res.cloudinary.com/frozenscloud/image/upload/v1538648226/heroidle.png", 64, 64, 8, 6
    );
    SpriteSheetRenderer.addSpriteSheetAnimation(
        "pirateidle", "https://res.cloudinary.com/frozenscloud/image/upload/v1538648226/pirate1idle.png", 32, 32, 6, 6
    );

    //Create Animation objects.
    SpriteSheetRenderer.loadAnimations((result) => { 
        animations = result 
        //When animations are loaded, assets are ready to be used.
        runAnimation(200, 200);
    });

    
});


function runAnimation(cx, cy) {
    //Create animator
    an = new Animator(ctx);
    //Add playable animations to animator
    an.addAnimation("heroidle", animations["heroidle"]);
    an.addAnimation("pirateidle", animations["pirateidle"]);
    //Set animation that should be played (default null)
    an.play("heroidle");
    
    //Call render animator on update.
    iid = setInterval(() => {
        ctx.clearRect(0, 0, 400, 400);
        ctx.save();
        an.render(cx, cy);
        ctx.restore();
    }, 16.666);
}