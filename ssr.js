

        //TODO VALIDATE PARAMETERS IN init(canvasId)
        //TODO VALIDATE PARAMETERS IN createSpriteFromSpriteSheet(...)

/*
 *  Author: Frosti Grétarsson 
 *  Date: October 2018
 * 
 */

/**
 * Main SpriteSheetRenderer object.
 * Contains logic for creating SpriteSheet objects.
 * 
 * -- Usage -- 
 *      Initialisation:
 *          On DOMContentLoaded call: 'SpriteSheetRenderer.init(canvasId);'
 * 
 *      Create sprite:  
 *          SpriteSheetRenderer.createSpriteFromSpriteSheet(imgSrc, frameWidth, frameHeight, frameCount, onReady);
 *      onReady is a callback function that gets passed the sprite when it's ready.
 *                                                     
 */
const SpriteSheetRenderer = (function() {
    let oCanvas;
    let oCtx;


    /**
     * Initialises this SpriteSheetRenderer object.
     * @param {*} canvasId html id of canvas to to draw on.
     * 
     */
    function init(canvasId) {                                               ///<---------------------PUBLIC-------------------------------------->
        oCanvas = document.getElementById(canvasId);
        oCtx = canvas.getContext("2d");
    }

    /**
     * Function takes an imgSrc and splits it into frames and creates a Sprite. When done,
     * calls onReady callback function and passes the resulting Sprite as a parameter.
     * @param {str} imgSrc src URL of image
     * @param {int} frameWidth width of sprite frame. Should be a factor of image width
     * @param {int} frameHeight height of sprite frame . Should be a factor of image height
     * @param {int} frameCount  How many frames are in the spritesheet.
     * @param {func} onReady function that gets passed the sprite object when ready.
     */
    function createSpriteFromSpriteSheet(imgSrc, frameWidth, frameHeight, frameCount, onReady) {    //<----------PUBLIC--------------------------------------->
        const img = new Image();
        img.crossOrigin = "Anonymous";  //Allow cross origin images
        img.onload = function() {   //Wait for image to load before working with it.   
            splitImage(img, frameWidth, frameHeight, frameCount, onReady);
        }
        img.src = imgSrc;
    }

    /**
     * Takes an image(spritesheet) and splits it into frames. Image should already 
     * be loaded. Then creates a sprite. Calls onReady callback function when done 
     * passing the resulting Sprite as a parameter.
     * @param {Image} img Spritesheet to split
     * @param {int} frameWidth width of sprite frame. Should be a factor of image width
     * @param {int} frameHeight height of sprite frame . Should be a factor of image height
     * @param {int} frameCount  How many frames in spritesheet
     * @param {func} onReady function to call when task is done, should
     */
    function splitImage(img, frameWidth, frameHeight, frameCount, onReady) {
        const frames = [];  //return object
        frames.loading = frameCount;  //no. of frames to load from dataURL.
        //Create canvas to use for splitting image into frames.
        const canv = document.createElement('canvas');
        const ctx = canv.getContext("2d");
        canv.width = frameWidth;
        canv.height = frameHeight;
        let srcX = 0; //sourceX for ctx.drawImage(...)
        let srcY = 0; //sourceY for ctx.drawImage(...)
        //Split into frames
        while(frameCount > 0) {
            if(srcX >= img.width) { //Start on next row
                srcX = 0;
                srcY += frameHeight;
            }
            ctx.clearRect(0, 0, frameWidth, frameHeight);
            ctx.drawImage(img, srcX, srcY, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);
            createAndPushNewFrame(frames, canv, onReady);
            
            srcX += frameWidth;
            frameCount--;
            
        }

    }

    /**
     * Creates a new Image object from a canvas.
     * @param {list} list containing frames
     * @param {canvas} canvas
     * @param {onAllFramesLoaded} function called when last frame has loaded.
     * @return {Image} The image created. 
     */
    function createAndPushNewFrame(frameList, canvas, onAllFramesLoaded) {
        const img = new Image();
        frameList.push(img);
        img.src = canvas.toDataURL("image/png");
        img.onload = () => { 
            //When frameList.loading == 0, all frames are ready.
            frameList.loading--;    
            if(frameList.loading == 0) {
                //source image has been split and loaded can be returned.
                const sprite = new Sprite(oCtx, frameList);
                onAllFramesLoaded(sprite);
            }
        }
    }



    /**
     * Development debug method. Should only be accessible
     * during development.
     */
    function _debug(obj) {
        if(!obj) obj = {};

        console.log(oCanvas);

        if(obj.img) {
        console.log("Drawing image");
        oCtx.save();
        oCtx.drawImage(obj.img, 200, 200);
        oCtx.restore();
        }
        
    }


    return {
        init,
        createSpriteFromSpriteSheet,
        _debug,
    }

 })();