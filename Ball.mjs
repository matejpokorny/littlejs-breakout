"use strict";
const sound_bounce = new Sound(
  [, , 1e3, , 0.03, 0.02, 1, 2, , , 940, 0.03, , , , , 0.2, 0.6, , 0.06],
  0
);

export class Ball extends EngineObject {
  constructor(pos, paddle) {
    super(pos, vec2(0.5)); // set object position and size

    this.paddle = paddle; // keep track of paddle object
    this.velocity = vec2(-0.1, -0.1); // give ball some movement
    this.setCollision(); // make object collide
    this.elasticity = 1; // make object bounce
  }
  collideWithObject(o) {
    // prevent colliding with paddle if moving upwards
    if (o == this.paddle && this.velocity.y > 0) return false;

    // speed up
    const speed = min(1.04 * this.velocity.length(), 0.5);
    // this.velocity = this.velocity.normalize(speed);
    // play bounce sound with pitch scaled by speed
    sound_bounce.play(this.pos, 1, speed);

    if (o == this.paddle) {
      // control bounce angle when ball collides with paddle
      const deltaX = this.pos.x - o.pos.x;
      this.velocity = this.velocity.rotate(0.3 * deltaX);

      // make sure ball is moving upwards with a minimum speed
      this.velocity.y = max(-this.velocity.y, 0.2);

      // prevent default collision code
      return false;
    }

    return true; // allow object to collide
  }
}
