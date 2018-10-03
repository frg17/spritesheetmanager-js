
 let ssr;

 window.addEventListener('DOMContentLoaded', () => {
  SpriteSheetRenderer.init("canvas");
  ssr = SpriteSheetRenderer;
  SpriteSheetRenderer._debug();
  var img = loadImage();
 });

function loadImage() {
  const img = new Image();
  img.src = "pirate1idle.png";
  img.onload = function() {
    console.log("Image loaded");
    ssr._debug({ img });
  }
}

function splitImage(width, height, frameWidth, frameHeight) {
  const canv = document.createElement('canvas');
  const ctx = canv.getContext("2d");
}
