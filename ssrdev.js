let animations;
let ctx;
let an;
let st;
let lastfr = null;
let dt = 0;

window.addEventListener('DOMContentLoaded', () => {
    ctx = document.getElementById('canvas').getContext('2d');
    
    //Add resources for renderer to create animations from
    SpriteSheetManager.addSpriteSheetAnimation(
        "idle", 
        "https://res.cloudinary.com/frozenscloud/image/upload/v1538747380/idle.png", 
        32, 64, 1, 0
    );
    SpriteSheetManager.addSpriteSheetAnimation(
        "walk", 
        "https://res.cloudinary.com/frozenscloud/image/upload/v1538747380/walk.png", 
        32, 64, 6, 600
    );
    SpriteSheetManager.addSpriteSheetAnimation(
        "push",
        "https://res.cloudinary.com/frozenscloud/image/upload/v1538751438/push.png",
        32, 64, 6, 600
    );

    //Create Animation objects.
    SpriteSheetManager.loadAnimations((result) => { 
        animations = result;
        //When animations are loaded, assets are ready to be used.
        //runAnimation(200, 200);
        st = new St();
        window.requestAnimationFrame(run);
    });
});

function run(frameT) {
    if(lastfr === null) lastfr = frameT;
    dt = frameT - lastfr;
    lastfr = frameT;
    ctx.clearRect(0, 0, 400, 400);
    st.update(dt);
    window.requestAnimationFrame(run);
}

const KEY_D = 'D'.charCodeAt(0);
const KEY_A = 'A'.charCodeAt(0);
const KEY_F = 'F'.charCodeAt(0);
keys = [];

function St() {
    this.cx = 200;
    this.cy = 200;
    this.angle = 0;
    this.xScale = 1;
    this.yScale = 1;
    this.animator = new Animator(ctx);
    this.animator.addAnimation("idle", animations["idle"]);
    this.animator.addAnimation("walk", animations["walk"]);
    this.animator.addAnimation("push", animations["push"]);
    this.animator.playAnimation("idle");
    this.state = "idle";

}

St.prototype.update = function(dt) {
    if(keys[KEY_D] && (this.state != "walkr")) {
        this.state = "walkr";
        this.xScale = 1;
        this.animator.playAnimation("walk");
    } else if (keys[KEY_A] && (this.state != "walkl")) {
        this.state = "walkl";
        this.xScale = -1;
        this.animator.playAnimation("walk");
    } else if (keys[KEY_F]) {
        this.state = "idle";
        this.animator.playAnimationOnce("push", null);
    }
    else if(!keys[KEY_D] && !keys[KEY_A] && (this.state != "idle")) {
        this.state = "idle";
        this.animator.playAnimation("idle");
    }
    
    this.animator.update(dt, this.cx, this.cy, this.angle, this.xScale, this.yScale);
}

document.addEventListener("keydown", (e) => {
    keys[e.keyCode] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.keyCode] = false;
});