export const GAME_STATE = {
  RUNNING: 'RUNNING',
  STOPPED: 'STOPPED',
  CAN_RUN: 'CAN_RUN',
};

export const FACE_DIRECTION = { RIGHT: 1, LEFT: -1 };

export const commonSounds = {
    game_start:'./core/assets/audio/game-start.mp3',
    game_over:'./core/assets/audio/game-over.mp3'
}

export const gamesData = [
  {
    name: 'rocket',
    assets: {
      images: [
        {
          name: 'red_rocket',
          src: './games/rocket/assets/images/red-rocket.png',
        },
        {
          name: 'blue_rocket',
          src: './games/rocket/assets/images/blue-rocket.png',
        },
        { name: 'background', src: './games/rocket/assets/images/bg.jpg' },
        { name: 'blast', src: './games/rocket/assets/images/blast.png' },
        {
          name: 'red_obstacle',
          src: './games/rocket/assets/images/red-obstacle.png',
        },
        {
          name: 'blue_obstacle',
          src: './games/rocket/assets/images/blue-obstacle.png',
        },
      ],
      sounds: [
        { name: 'poof', src: './games/rocket/assets/audio/poof.mp3' },
      ],
    },
  },
  {
    name: 'timberman',
    assets: {
      images: [
        {
          name: 'background',
          src: './games/timberman/assets/images/bg.jpg',
        },
        {
          name: 'blue_idle',
          src: './games/timberman/assets/images/blue-idle.png',
        },
        {
          name: 'blue_jump',
          src: './games/timberman/assets/images/blue-jump.png',
        },
        {
          name: 'red_idle',
          src: './games/timberman/assets/images/red-idle.png',
        },
        {
          name: 'red_jump',
          src: './games/timberman/assets/images/red-jump.png',
        },
        {
          name: 'obstacle',
          src: './games/timberman/assets/images/obstacle.png',
        },
        {
          name: 'log_pile',
          src: './games/timberman/assets/images/log-pile.png',
        }
      ],
      sounds: [
        {
          name: 'hit',
          src: './games/timberman/assets/audio/hit.mp3'
        },
      ],
    },
  },
  {
    name: 'goal',
    assets: {
      images: [
        { name: 'background', src: './games/goal/assets/images/bg.jpg' },
        {
          name: 'football',
          src: './games/goal/assets/images/football.png',
        },
        {
          name: 'redPlayer',
          src: './games/goal/assets/images/redPlayer.png',
        },
        {
          name: 'bluePlayer',
          src: './games/goal/assets/images/bluePlayer.png',
        },
        {
          name: 'post',
          src: './games/goal/assets/images/post.png',
        },
      ],
      sounds: [
        { name: 'kick', src: './games/goal/assets/audio/football-kick.wav' },
        { name: 'cheer', src: './games/goal/assets/audio/cheer.wav' },
      ],
    },
  },
];

export const instructions = {
  timberman :  '1. Press A and L to escape the obstacle.<br><br> 2. Colliding into obstacle gives point to another player.<br><br>3. Game ends at 5 points.',
  rocket : '1. Press A and L to escape the obstacle.<br><br> 2. Colliding into obstacle gives point to another player.<br><br>3. Game ends at 5 points.',
  goal : '1. Press A and L to move the player.<br><br> 2. Each goal gains 1 point. <br><br>3. Game ends at 5 points.'
}
