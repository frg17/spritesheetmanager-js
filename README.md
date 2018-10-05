# Javascript Sprite Sheet Renderer

This is a simple module that can split sprite sheets into
their respective frames to form animations. The module 
also contains an Animator to help the user animate those
animations in an easy way. 

 __Note:__ Sprites in spritesheets should be centered in their frame.

### Documentation

__SpriteSheetRenderer.addSpriteSheetAnimation(animationName, imgSrc, frameWidth, frameHeight, frameCount, frameInterval)__

    Adds a spritesheet to the animation work queue. Animations get processed
    when loadAnimations() is called. Function can not be called after loadAnimations()
    has been called.
    
    @param {str} _animationName_ name of animation
    
    @param {str} _imgSrc_ image URL
    
    @param {int} _frameWidth_ width each animation frame
    
    @param {int} _frameHeight_ height of each animation frame
    
    @param {int} _frameCount_ number of frames in animation.
    
    @param {int} _frameInterval_ animation should update every n frames

__SpriteSheetRenderer.loadAnimations(callback)__

    Functions starts loading and creating all animations added to job queue.
    When all animations have been created, callback function is called that
    is passed an object holding all animations with its animationName as a key.
    Can not be called more than once.
    
    @param {func} _callback_ callback function returning object.

__Animator(ctx)__

    Creates an animator that draws on the given context

    @param {"2DDrawingContext"} _ctx_ context to draw upon

__Animator.prototype.addAnimation(animationName, animation)__

    Adds a an animation as playable by animator.

    @param {str} _animationName_ name to store animation

    @param {Animation} _animation_ to be stored.

__Animator.prototype.playAnimation(animationName)__ 

    The animator is set to render the animation with the given name (key).

    @param {str} _animationName_ name (key) of animation that should be played


__Animator.prototype.update(cx, cy, angle, scaleX, scaleY)__

    Renders the Animators current animation at the specified coordinates.

    @param {int} _cx_ center x

    @param {int} _cy_ center y

    @param {float} _angle_ radian angle

    @param {float} _scaleX_ scale for the x axis of animation

    @param {float} _scaleY_ scale for the y axis of animation

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
        let x = 200;
        let y = 200;
        let angle = 0;
        let scale = 1;


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
                runAnimation();
            });
        });


        function runAnimation() {
            //Create animator
            an = new Animator(ctx);

            //Add playable animations to animator
                //Not centred in frame (change angle to see problem)
            an.addAnimation("heroidle", animations["heroidle"]); 
                //Centred in frame
            an.addAnimation("pirateidle", animations["pirateidle"]);

            //Set animation that should be played (default null)
            an.playAnimation("pirateidle");
            
            //Call render animator on update.
            iid = setInterval(() => {
                ctx.clearRect(0, 0, 400, 400);
                ctx.save();
                an.update(x, y, angle, scale);
                ctx.restore();
            }, 16.666);
        }
    </script>
</body>
```
Letting this code run, should allow you to call `an.play("pirateidle")`
to change the animation the animator is currently animating (and vice versa).
Also you should be able to modify x, y, angle and scale and see immediate results.

### Known errors

If you try and load a spritesheet from a local disk, the browser will
raise an exception for a tainted canvas. Spritesheets must be from a
server (f.x. cloudinary like in the example).
