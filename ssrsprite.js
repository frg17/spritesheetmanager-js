
/**
 * 
 * @param {Animator} animator Animator object.
 */
function SSRSprite(ctx, animator) {
    if(!animator) return console.log("No animator received");
    this.animator = animator;
    this.ctx = ctx;
}

/**
 * Draws a sprite on the screen.
 * @param {int} cx center x of sprite
 * @param {int} cy center y of sprite
 * @param {float} angle angle of sprite rotation
 * @param {float} scale scale of sprite
 */
SSRSprite.prototype.draw = function (cx, cy, angle, scale) {
    if (angle == undefined) angle = 0;
    if (scale == undefined) scale = 1;

    this.ctx.save();
    this.ctx.translate(cx, cy);
    this.ctx.rotate(angle);
    this.ctx.scale(scale, scale);
    this.ctx.translate(-cx, -cx);
    this.animator.render(cx, cy);

    ctx.restore();
}
