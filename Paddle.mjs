"use strict";

///////////////////////////////////////////////////////////////////////////////
export class Paddle extends EngineObject {
  constructor(levelSize) {
    super(vec2(0, 1), vec2(6, 0.5)); // set object position and size
    this.setCollision(); // make object collide
    this.mass = 0; // make object have static physics`
    this.levelSize = levelSize; // keep track of level size
  }

  update() {
    this.pos.x = mousePos.x; // move paddle to mouse

    // clamp paddle to level size
    this.pos.x = clamp(
      this.pos.x,
      this.size.x / 2,
      this.levelSize.x - this.size.x / 2
    );
  }
}
