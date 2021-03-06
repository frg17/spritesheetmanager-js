# Javascript Sprite Sheet Renderer

This is a simple module that can split sprite sheets into
their respective frames to form animations. The module 
also contains an Animator to help the user animate those
animations in an easy way. 

 __Note:__ Sprites in spritesheets should be centered in their frame.

### Documentation

__SpriteSheetManager.addSpriteSheetAnimation(animationName, imgSrc, frameWidth, frameHeight, frameCount, animationLength)__

    Adds a spritesheet to the animation work queue. Animations get processed
    when loadAnimations() is called. Function can not be called after loadAnimations()
    has been called.
    
    @param {str} _animationName_ name of animation
    
    @param {str} _imgSrc_ image URL
    
    @param {int} _frameWidth_ width each animation frame
    
    @param {int} _frameHeight_ height of each animation frame 
    
    @param {int} _frameCount_ number of frames in animation.
    
    @param {int} _animationLength_ length (ms) of animation

__SpriteSheetManager.loadAnimations(callback)__

    Functions starts loading and creating all animations added to job queue.
    When all animations have been created, callback function is called that
    is passed an object holding all animations with its animationName as a key.
    Can not be called more than once.
    
    @param {func} _callback_ callback function returning object.

__SpriteSheetManager.get(animationName, frame)__

    Function returns an animation with given name OR if frame
    is included, returns that frame (as an image) of the animation
    with the given name.

    @param {string} animationName
    
    @param {int} frame get Image for specific frame of animation if included

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

__Animator.prototype.playAnimationOnce(animationName, nextAnimationName)__ 

    Plays animation once and then immediately changes to the next one.

    @param {str} animationName Animation to play once
    
    @param {str} nextAnimationName Next animation to transition to. If null plays no animation after one shot has finished.

__Animator.prototype.update(dt, cx, cy, angle, scaleX, scaleY)__

    Renders the Animators current animation at the specified coordinates.

    @param {int} _dt_ Time elapsed since last render

    @param {int} _cx_ center x

    @param {int} _cy_ center y

    @param {float} _angle_ radian angle DEFAULT 0

    @param {float} _scaleX_ scale for the x axis of animation DEFAULT 1

    @param {float} _scaleY_ scale for the y axis of animation DEFAULT 1

### Example usage
See canv.html

### Known errors

If you try and load a spritesheet from a local disk, the browser will
raise an exception for a tainted canvas. Spritesheets must be from a
server (f.x. cloudinary like in the example).
