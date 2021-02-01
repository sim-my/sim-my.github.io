export const GAME_STATE = { RUNNING: "RUNNING", STOPPED: "STOPPED", CAN_RUN: "CAN_RUN" };

export const gamesData = [
  {
    name: "football-random",
    cardImageSrc: "./core/assets/rockets.png",
    assets: [
      { name: "background", src: "./games/V/assets/bg.jpg" },
      {
        name: "football",
        src: "./games/football-random/assets/football.png",
      },
    ],
  },
  {
    name: "flames",
    cardImageSrc: "./core/assets/rockets.png",
  },
  {
    name: "rocket",
    cardImageSrc: "./core/assets/rockets.png",
    assets: [
      {
        name: "red-rocket",
        src: "./games/rocket/assets/images/red-rocket.png",
      },
      {
        name: "blue-rocket",
        src: "./games/rocket/assets/images/blue-rocket.png",
      },
      { name: "background", src: "./games/rocket/assets/images/bg.jpg" },
      { name : "blast", src: "./games/rocket/assets/images/blast.png" },
      { name : "red-obstacle", src: "./games/rocket/assets/images/red-obstacle.png" },
      { name : "blue-obstacle", src: "./games/rocket/assets/images/blue-obstacle.png" },

    ],
  },
  {
    name: "timberman",
    cardImageSrc: "./core/assets/rockets.png",
    assets: [
      {
        name: "background",
        src: "./games/timberman/assets/images/bg.jpg",
      },
      {
        name: "blue-idle",
        src: "./games/timberman/assets/images/blue-idle.png",
      },
      {
        name: "blue-jump",
        src: "./games/timberman/assets/images/blue-jump-2.png",
      },
      {
        name: "red-idle",
        src: "./games/timberman/assets/images/red-idle.png",
      },
      {
        name: "red-jump",
        src: "./games/timberman/assets/images/red-jump-2.png",
      },
      {
        name: "obstacle-1",
        src: "./games/timberman/assets/images/obstacle-1.png",
      },
      {
        name: "obstacle-2",
        src: "./games/timberman/assets/images/obstacle-2.png",
      },
      {
        name: "obstacle-3",
        src: "./games/timberman/assets/images/obstacle-3.png",
      },
      {
        name: "obstacle-4",
        src: "./games/timberman/assets/images/obstacle-4.png",
      },
      {
        name: "obstacle-5",
        src: "./games/timberman/assets/images/obstacle-5.png",
      },
      {
        name: "obstacle-6",
        src: "./games/timberman/assets/images/obstacle-6.png",
      },
      {
        name: "obstacle-7",
        src: "./games/timberman/assets/images/obstacle-7.png",
      },
      {
        name: "obstacle-8",
        src: "./games/timberman/assets/images/obstacle-8.png",
      },
      {
        name: "log-pile",
        src: "./games/timberman/assets/images/log-pile.png",
      },
    ],
  },
  {
    name: "goal",
    cardImageSrc: "./core/assets/rockets.png",
    assets: [
      { name: "background", src: "./games/goal/assets/bg.png" },
      {
        name: "football",
        src: "./games/goal/assets/football.gif",
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
  },
];
