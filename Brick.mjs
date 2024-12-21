"use strict";
const sound_break = new Sound(
  [, , 90, , 0.01, 0.03, 4, , , , , , , 9, 50, 0.2, , 0.2, 0.01],
  0
);

export class Brick extends EngineObject {
  constructor(pos, size, updateScore) {
    super(pos, size);

    this.updateScore = updateScore; // keep track of score update function
    this.setCollision(); // make object collide
    this.mass = 0; // make object have static physics
    this.color = randColor(); // give brick a random color
  }

  collideWithObject(o) {
    this.destroy(); // destroy block when hit
    sound_break.play(this.pos); // play brick break sound
    this.updateScore(1);

    // create explosion effect
    const color = this.color;
    new ParticleEmitter(
      this.pos,
      0, // pos, angle
      this.size,
      0.1,
      200,
      PI, // emitSize, emitTime, emitRate, emiteCone
      undefined, // tileInfo
      color,
      color, // colorStartA, colorStartB
      color.scale(1, 0),
      color.scale(1, 0), // colorEndA, colorEndB
      0.2,
      0.5,
      1,
      0.1,
      0.1, // time, sizeStart, sizeEnd, speed, angleSpeed
      0.99,
      0.95,
      0.4,
      PI, // damp, angleDamp, gravity, cone
      0.1,
      0.5,
      false,
      true // fade, randomness, collide, additive
    );

    return true; // allow object to collide
  }
}
