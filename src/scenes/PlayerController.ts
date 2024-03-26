import Phaser from "phaser";
import StateMachine from "../statemachine/StateMachine";
type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
export default class PlayerController {
  private sprite: Phaser.Physics.Matter.Sprite;
  private cursors: CursorKeys;
  private stateMachine: StateMachine;
  constructor(sprite: Phaser.Physics.Matter.Sprite, cursors: CursorKeys) {
    this.sprite = sprite;
    this.cursors = cursors;
    this.stateMachine = new StateMachine(this, "player");
    this.stateMachine
      .addState("idle", {
        onEnter: this.idleOnEnter,
      })
      .addState("walk", {
        onEnter: this.walkOnEnter,
        onUpdate: this.walkOnUpdate,
      })
      .addState("jump", {
        onEnter: this.jumponUp,
      })
      .setState("idle");

    this.sprite.setOnCollide((data: MatterJS.ICollisionPair) => {
      if (this.stateMachine.isCurrrentState("jump")) {
        this.stateMachine.setState("idle");
      }
    });
  }
  update(dt: number) {
    this.stateMachine.update(dt);
  }
  private idleOnEnter() {
    this.sprite.play("player-idle");
  }
  private idleOnUpdate() {
    if (this.cursors.left.isDown || this.cursors.right.isDown) {
      this.stateMachine.setState("walk");
    }
    const upPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up);
    if (upPressed) {
      this.stateMachine.setState("jump");
    }
  }
  private walkOnEnter() {
    this.sprite.play("player-walk");
  }
  private walkOnUpdate() {
    const speed = 5;
    if (this.cursors.left.isDown) {
      this.sprite.flipX = true;
      this.sprite.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.sprite.flipX = false;
      this.sprite.setVelocityX(speed);
    } else {
      this.sprite.setVelocityX(0);
      this.stateMachine.setState("idle");
    }
  }
  private jumponUp() {
    this.sprite.setVelocityY(-10);
  }
  private createAnimations() {
    this.sprite.anims.create({
      key: "player-idle",
      frames: [{ key: "penguin", frame: "penguin_walk01.png" }],
    });
    this.sprite.anims.create({
      key: "player-walk",
      frameRate: 10,
      frames: this.sprite.anims.generateFrameNames("penguin", {
        start: 1,
        end: 4,
        prefix: "penguin_walk0",
        suffix: ".png",
      }),
      repeat: -1,
    });
  }
}
