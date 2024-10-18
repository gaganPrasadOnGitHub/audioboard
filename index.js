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
    checkboxLabel.textContent = 'Disable';
  } else {
    checkboxLabel.textContent = 'Enable';
  }
});

const convertTextToAudio = (Text) => {
  const synth = window.speechSynthesis;
  const voice = new SpeechSynthesisUtterance(Text);

  synth.speak(voice);
};

const STATUS = {
  INACTIVE: '0',
  ACTIVE: '1',
};

const keyMappings = {
  ' ': 'Space',
  Alt: 'Option',
  Meta: 'Command',
  '\\': 'BackSlash',
  '|': 'Vertical bar',
};

const checkKey = (key) => {
  return keyMappings[key] || key;
};

const handleHighlightKey = (keyCode, status) => {
  let keyElement = document.querySelector(`.key[data-key="${keyCode}"]`);

  if (keyElement && status === STATUS.ACTIVE) {
    keyElement.classList.add('active');
  }
  if (keyElement && status === STATUS.INACTIVE) {
    setTimeout(() => keyElement.classList.remove('active'), 200);
  }
};

document.addEventListener('keydown', function (event) {
  const key = event.key;
  const keyCode = event.code;

  activeKeys.add(keyCode);
  handleHighlightKey(keyCode, STATUS.ACTIVE);

  if (isAudioEnable) {
    convertTextToAudio(checkKey(key));
  }
});

document.addEventListener('keyup', function (event) {
  const keyCode = event.code;

  activeKeys.delete(keyCode);
  handleHighlightKey(keyCode, STATUS.INACTIVE);
});

document.addEventListener('keyup', function (event) {
  if (event.key === 'Meta') {
    activeKeys.forEach((keyCode) => {
      handleHighlightKey(keyCode, STATUS.INACTIVE);
    });
    activeKeys.clear();
  }
});

textToVoiceButton.addEventListener('click', () => {
  const message = messageTextarea.value;
  console.log('message');
  if (message) {
    convertTextToAudio(message);
  }
});

clearMessageButton.addEventListener('click', () => {
  messageTextarea.value = '';
});
