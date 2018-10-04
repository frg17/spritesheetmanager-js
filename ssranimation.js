function Animation(ctx, frames) {
    this.ctx = ctx;
    this.frameInterval = 1;     //frame should update every x frames
    this.frameIntervalStep = 1; //
    this.nextFrame = 0;
    this.length = frames.length;
    this.frames = frames;
}

Animation.prototype.render = function(cx, cy) {
    this.frameIntervalStep--;
    frameToDraw = this.frames[this.nextFrame];
    if(this.frameIntervalStep == 0) {  
        //Animation frame should update on next call.
        this.frameIntervalStep = this.frameInterval;
        this.nextFrame++;
        if(this.nextFrame >= this.length) this.nextFrame = 0;
    }
    var hw = frameToDraw.width / 2;
    var hh = frameToDraw.height / 2;
    this.ctx.drawImage(frameToDraw, cx - hw, cy - hh);
}
