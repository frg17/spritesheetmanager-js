function Sprite(ctx, frames) {
    this.ctx = ctx;
    this.cx = 200;        //Center x
    this.cy = 200;        //Center y
    this.isStatic = frames.length ? false : true;
    this.nextFrame = 0;
    this.frames = frames;
}

Sprite.prototype.renderEveryMS = function(ms) {
    setInterval(() => {
        if(this.nextFrame >= this.frames.length) this.nextFrame = 0;
        var frameToDraw = this.frames[this.nextFrame];
        this.nextFrame++;
        var hw = frameToDraw.width / 2;
        var hh = frameToDraw.height / 2;
        this.ctx.save();
        this.ctx.clearRect(0, 0, 400, 400);
        this.ctx.drawImage(frameToDraw, this.cx - hw, this.cy - hh);
        this.ctx.restore();
    }, ms);
}
