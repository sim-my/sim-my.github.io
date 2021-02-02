export const GAME_STATE = {
  RUNNING: "RUNNING",
  STOPPED: "STOPPED",
  CAN_RUN: "CAN_RUN",
};

export const FACE_DIRECTION = { RIGHT: "RIGHT", LEFT: "LEFT" };

export const gamesData = [
  {
    name: "rocket",
    cardImageSrc: "./core/assets/rockets.png",
    assets: {
      images: [
        {
          name: "red_rocket",
          src: "./games/rocket/assets/images/red-rocket.png",
        },
        {
          name: "blue_rocket",
          src: "./games/rocket/assets/images/blue-rocket.png",
        },
        { name: "background", src: "./games/rocket/assets/images/bg.jpg" },
        { name: "blast", src: "./games/rocket/assets/images/blast.png" },
        {
          name: "red_obstacle",
          src: "./games/rocket/assets/images/red-obstacle.png",
        },
        {
          name: "blue_obstacle",
          src: "./games/rocket/assets/images/blue-obstacle.png",
        },
      ],
      sounds: [
        {
          name: "blue_shoot",
          src: "./games/rocket/assets/audio/blue-shoot.mp3",
        },
        { name: "poof", src: "./games/rocket/assets/audio/poof.mp3" },
        { name: "red_shoot", src: "./games/rocket/assets/audio/red-shoot.mp3" },
      ],
    },
  },
  {
    name: "timberman",
    cardImageSrc: "./core/assets/rockets.png",
    assets: {
      images: [
        {
          name: "background",
          src: "./games/timberman/assets/images/bg.jpg",
        },
        {
          name: "blue_idle",
          src: "./games/timberman/assets/images/blue-idle.png",
        },
        {
          name: "blue_jump",
          src: "./games/timberman/assets/images/blue-jump.png",
        },
        {
          name: "red_idle",
          src: "./games/timberman/assets/images/red-idle.png",
        },
        {
          name: "red_jump",
          src: "./games/timberman/assets/images/red-jump.png",
        },
        {
          name: "obstacle",
          src: "./games/timberman/assets/images/obstacle.png",
        },
        {
          name: "log_pile",
          src: "./games/timberman/assets/images/log-pile.png",
        }
      ],
      sounds: [
        {
          name: "blue_hit",
          src: "./games/timberman/audio/blue-hit.mp3"
        },
        {
          name: "blue_jump",
          src: "./games/timberman/audio/blue-jump.mp3"
        },
        {
          name: "red_hit",
          src: "./games/timberman/audio/red-hit.mp3"
        },
        {
          name: "red_jump",
          src: "./games/timberman/audio/red-jump.mp3"
        },
      ],
    },
  },
  {
    name: "goal",
    cardImageSrc: "./core/assets/rockets.png",
    assets: {
      images: [
        { name: "background", src: "./games/goal/assets/bg.png" },
        {
          name: "football",
          src: "./games/goal/assets/football.png",
        },
        {
          name: "player1",
          src: "./games/goal/assets/player1.png",
        },
        {
          name: "player2",
          src: "./games/goal/assets/player2.png",
        },
        {
          name: "post",
          src: "./games/goal/assets/post.png",
        },
      ],
      sounds: [
        { name: "kick", src: "./games/goal/assets/sounds/football-kick.wav" },
        { name: "cheer", src: "./games/goal/assets/sounds/cheer.wav" },
      ],
    },
  },
];
