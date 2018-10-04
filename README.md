# Javascript Sprite Sheet Renderer

This is a simple module that can split sprite sheets into
their respective frames to form animations. The module 
also contains an Animator to help the user animate those
animations in an easy way. 

### Documentation

__SpriteSheetRenderer.addSpriteSheetAnimation(animationName, imgSrc, frameWidth, frameHeight, frameCount, frameInterval)__

    Adds a spritesheet to the animation work queue. Animations get processed
    when loadAnimations() is called. Function can not be called after loadAnimations()
    has been called.
    
    @param {str} animationName name of animation
    
    @param {str} imgSrc image URL
    
    @param {int} frameWidth width each animation frame
    
    @param {int} frameHeight height of each animation frame
    
    @param {int} frameCount number of frames in animation.
    
    @param {int} frameInterval animation should update every n frames

__SpriteSheetRenderer.loadAnimations(callback)__

    Functions starts loading and creating all animations added to job queue.
    When all animations have been created, callback function is called that
    is passed an object holding all animations with its animationName as a key.
    Can not be called more than once.
    
    @param {func} callback   callback function returning object.



------------------

ANIMATOR DOC HERE

------------------

### Example usage
```
<!DOCTYPE html>
<head>
    <script src="ssranimation.js"></script>
    <script src="ssr.js"></script>
</head>

<body> 
    <canvas height=400 width=400 id="canvas"></canvas>


    <script>
        let animations;
let ctx;
let an;


window.addEventListener('DOMContentLoaded', () => {
    ctx = document.getElementById('canvas').getContext('2d');
    
    //Add resources for renderer to create animations from
    SpriteSheetRenderer.addSpriteSheetAnimation(
        "heroidle", 
        "https://res.cloudinary.com/frozenscloud/image/upload/v1538648226/heroidle.png", 
        64, 64, 8, 6
    );
    SpriteSheetRenderer.addSpriteSheetAnimation(
        "pirateidle", 
        "https://res.cloudinary.com/frozenscloud/image/upload/v1538648226/pirate1idle.png", 
        32, 32, 6, 6
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
    </script>
</body>
```
Letting this code run, should allow you to call `an.play("pirateidle")`
to change the animation the animator is currently animating (and vice versa).

### Known errors

If you try and load a spritesheet from a local disk, the browser will
raise an exception for a tainted canvas. Spritesheets must be from a
server (f.x. cloudinary like in the example).
