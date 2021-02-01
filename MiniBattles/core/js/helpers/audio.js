export const playAudio = (audioUrl) => {
  var audio = new Audio(audioUrl);
  audio.play();
};
