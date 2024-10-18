import { KEY_MAPPINGS, KEY_STATUS } from './constants.js';

export const handleHighlightKey = (keyCode, status) => {
  let keyElement = document.querySelector(`.key[data-key="${keyCode}"]`);

  if (keyElement && status === KEY_STATUS.ACTIVE) {
    keyElement.classList.add('active');
  }
  if (keyElement && status === KEY_STATUS.INACTIVE) {
    setTimeout(() => keyElement.classList.remove('active'), 200);
  }
};

export const convertTextToAudio = (Text) => {
  const synth = window.speechSynthesis;
  const voice = new SpeechSynthesisUtterance(Text);

  synth.speak(voice);
};

export const checkKey = (key) => {
  return KEY_MAPPINGS[key] || key;
};
