/*
 *  Author: Frosti Grétarsson 
 *  
 * 
 */

 /**
  * Main SpriteSheetRenderer object.
  * Contains logic for creating SpriteSheet objects.
  * 
  * Usage: 
  *   On DOMContentLoaded call: 'SpriteSheetRenderer.init(canvasId);'
  */
const SpriteSheetRenderer = (function() {
  let canvas;
  let ctx;


  /**
   * Initialises this SpriteSheetRenderer object.
   * @param {*} canvasId html id of canvas to to draw on.
   * 
   */
  function init(canvasId) {
    canvas = document.getElementById(canvasId);
    ctx = canvas.getContext("2d");
  }



  /**
   * Development debug method. Should only be accessible
   * during development.
   */
  function _debug(obj) {
    if(!obj) obj = {};

    console.log(canvas);

    if(obj.img) {
      console.log("Drawing image");
      ctx.save();
      ctx.drawImage(obj.img, 200, 200);
      ctx.restore();
    }
    
  }


  return {
    init,
    _debug,
  }

 })(); 

