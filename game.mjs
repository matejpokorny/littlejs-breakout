"use strict";

import { Ball } from "./Ball.mjs";
import { Brick } from "./Brick.mjs";
import { Paddle } from "./Paddle.mjs";
import { Wall } from "./Wall.mjs";

///////////////////////////////////////////////////////////////////////////////

// globals
export const levelSize = vec2(38, 20); // size of play area
export let score = 0; // start score at 0
let ball; // keep track of ball object
export let paddle; // keep track of player's paddle

// sound effects
const sound_start = new Sound([
  ,
  0,
  500,
  ,
  0.04,
  0.3,
  1,
  2,
  ,
  ,
  570,
  0.02,
  0.02,
  ,
  ,
  ,
  0.04,
]);

///////////////////////////////////////////////////////////////////////////////
function gameInit() {
  // create bricks
  for (let x = 2; x <= levelSize.x - 2; x += 2)
    for (let y = 12; y <= levelSize.y - 2; y += 1)
      new Brick(vec2(x, y), vec2(2, 1), (n) => (score += n)); // create brick

  cameraPos = levelSize.scale(0.5); // center camera in level
  canvasFixedSize = vec2(1280, 720); // use a 720p fixed size canvas

  paddle = new Paddle(levelSize); // create player's paddle

  // create walls
  new Wall(vec2(-0.5, levelSize.y / 2), vec2(1, 100)); // top
  new Wall(vec2(levelSize.x + 0.5, levelSize.y / 2), vec2(1, 100)); // left
  new Wall(vec2(levelSize.x / 2, levelSize.y + 0.5), vec2(100, 1)); // right
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdate() {
  if (ball && ball.pos.y < -1) {
    // if ball is below level
    // destroy old ball
    ball.destroy();
    ball = 0;
  }
  if (!ball && mouseWasPressed(0)) {
    // if there is no ball and left mouse is pressed
    ball = new Ball(cameraPos, paddle); // create new ball
    sound_start.play(); // play start sound
  }
}

///////////////////////////////////////////////////////////////////////////////
function gameUpdatePost() {}

///////////////////////////////////////////////////////////////////////////////
function gameRender() {
  drawRect(cameraPos, vec2(100), new Color(0.5, 0.5, 0.5)); // draw background
  drawRect(cameraPos, levelSize, new Color(0.1, 0.1, 0.1)); // draw level boundary
}

///////////////////////////////////////////////////////////////////////////////
function gameRenderPost() {
  drawTextScreen("Score " + score, vec2(mainCanvasSize.x / 2, 70), 50); // show score
}

///////////////////////////////////////////////////////////////////////////////
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost);
