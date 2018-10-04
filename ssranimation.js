
        //TODO VALIDATE PARAMETERS



/*

    Author: Frosti Grétarsson
    Date: October 4. 2018
    Description:

*/


/*

    ------- Animation --------
    Description:
        Animation object should hold frames and information 
        for rendering an animation with the Animator.
    
    Properties:
        int frameInterval: Animation should update every n-th update.
        int length: number of frames in animation
        int frames: all frames belonging to animation
*/


/**
 * @param {list} frames List of frames belonging to animation
 */
function Animation(frames) {
    this.frameInterval = 1;     //frame should update every x frames
    this.length = frames.length;
    this.frames = frames;
}


/*

    ------- Animator --------
    Description:
        Controller for animations. The Animator called when an animation
        should be rendered. It can be told which animation to render and
        where. Should hold animation logic for sprites.
        I.e. if a sprite has multiple animations f.x. walk left/right,
        the sprite should tell the animator weather to play the animation
        for left or the animation for right.

    Methods:
        addAnimation:(animationName, animation)
        play(animationName): plays the animation stored with the designated name.
        render(cx, cy): renders animation at given coordinates.
    
    Properties:
        CanvasRenderingContext2D ctx: context to draw animation upon
        int frameIntervalStep: How many updates until new frame
        int nextFrame: The number for the animation frame to display next.
        Map animations: Animations that Animator can animate.


    Usage: 
        const an = new Animator(ctx);
        an.add("animationName", animation);
        an.play("animationName");
        setInterval(() => {
            an.render();
        }, 16.666);

        ....
*/

/**
 * Creates an animator that draws upon the corresponding context
 * @param {"2DDrawingContext"} ctx to draw upon
 */
function Animator(ctx) {
    this.ctx = ctx;
    this.frameIntervalStep = 1; 
    this.nextFrame = 0;
    this.animations = {};
    this.currentAnimation = null;
}


/**
 * Adds a an animation as playable by animator.
 * @param {str} animationName name to store animation
 * @param {Animation} animation to be stored.
 */
Animator.prototype.addAnimation = function(animationName, animation) {
    this.animations[animationName] = animation;
}

/**
 * The animator renders the animation with the given name (key).
 * @param {str} animationName name (key) of animation that should be played
 */
Animator.prototype.play = function(animationName) {
    this.currentAnimation = this.animations[animationName];
    this.nextFrame = 0;
    this.frameIntervalStep = this.currentAnimation.frameInterval;
}

/**
 * Renders the Animators current animation at the specified coordinates.
 * @param {int} cx 
 * @param {int} cy 
 */
Animator.prototype.render = function(cx, cy) {
    this.frameIntervalStep--;
    const frameToDraw = this.currentAnimation.frames[this.nextFrame];
    if(this.frameIntervalStep == 0) {  
        //Animation frame should update on next call.
        this.frameIntervalStep = this.currentAnimation.frameInterval;
        this.nextFrame++;
        if(this.nextFrame >= this.currentAnimation.length) this.nextFrame = 0;
    }
    var hw = frameToDraw.width / 2;
    var hh = frameToDraw.height / 2;
    this.ctx.drawImage(frameToDraw, cx - hw, cy - hh);
}