import { KEY_STATUS, AUDIO_FEEDBACK_STATUS } from './constants.js';
import { checkKey, convertTextToAudio, handleHighlightKey } from './helper.js';

const audioCheckbox = document.getElementById('audioCheckbox');
const messageTextarea = document.getElementById('message');
const textToVoiceButton = document.getElementById('textToVoice');
const clearMessageButton = document.getElementById('clearMessage');
const checkboxLabel = document.getElementById('audioText');

let isAudioEnable = true;
const activeKeys = new Set();

audioCheckbox.addEventListener('change', (event) => {
  isAudioEnable = event.target.checked;

  if (isAudioEnable) {
    checkboxLabel.textContent = AUDIO_FEEDBACK_STATUS.ACTIVE;
  } else {
    checkboxLabel.textContent = AUDIO_FEEDBACK_STATUS.INACTIVE;
  }
});

document.addEventListener('keydown', function (event) {
  const key = event.key;
  const keyCode = event.code;

  activeKeys.add(keyCode);
  handleHighlightKey(keyCode, KEY_STATUS.ACTIVE);

  if (isAudioEnable) {
    convertTextToAudio(checkKey(key));
  }
});

document.addEventListener('keyup', function (event) {
  const keyCode = event.code;

  if (event.key === 'Meta') {
    activeKeys.forEach((keyCode) => {
      handleHighlightKey(keyCode, KEY_STATUS.INACTIVE);
    });
    activeKeys.clear();
  } else {
    activeKeys.delete(keyCode);
    handleHighlightKey(keyCode, KEY_STATUS.INACTIVE);
  }
});

textToVoiceButton.addEventListener('click', () => {
  const message = messageTextarea.value;
  if (message) {
    convertTextToAudio(message);
  }
});

clearMessageButton.addEventListener('click', () => {
  messageTextarea.value = '';
});
