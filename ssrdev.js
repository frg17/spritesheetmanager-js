let animations;
let ctx;
let an;
let st;

window.addEventListener('DOMContentLoaded', () => {
    ctx = document.getElementById('canvas').getContext('2d');
    
    //Add resources for renderer to create animations from
    SpriteSheetRenderer.addSpriteSheetAnimation(
        "idle", 
        "https://res.cloudinary.com/frozenscloud/image/upload/v1538747380/idle.png", 
        32, 64, 1, 1
    );
    SpriteSheetRenderer.addSpriteSheetAnimation(
        "walk", 
        "https://res.cloudinary.com/frozenscloud/image/upload/v1538747380/walk.png", 
        32, 64, 6, 6
    );

    //Create Animation objects.
    SpriteSheetRenderer.loadAnimations((result) => { 
        animations = result;
        //When animations are loaded, assets are ready to be used.
        //runAnimation(200, 200);
        run();
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


function run() {
    st = new St();

    setInterval(() => {
        ctx.clearRect(0, 0, 400, 400);
        st.update();
    }, 16.666);
}

const KEY_D = 'D'.charCodeAt(0);
const KEY_A = 'A'.charCodeAt(0);
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
    this.animator.playAnimation("idle");
    this.state = "idle";

}

St.prototype.update = function() {
    if(keys[KEY_D] && (this.state != "walkr")) {
        this.state = "walkr";
        this.xScale = 1;
        this.animator.playAnimation("walk");
    } else if (keys[KEY_A] && (this.state != "walkl")) {
        console.log(this.state);
        this.state = "walkl";
        this.xScale = -1;
        this.animator.playAnimation("walk");
    }
    else if(!keys[KEY_D] && !keys[KEY_A]) {
        this.state = "idle";
        this.animator.playAnimation("idle");
    }
    


    this.animator.update(this.cx, this.cy, this.angle, this.xScale, this.yScale);
}

document.addEventListener("keydown", (e) => {
    keys[e.keyCode] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.keyCode] = false;
});