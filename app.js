const character = document.getElementById('character');
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const emotions = ['neutral', 'thinking', 'happy', 'sad'];

function setCharacterEmotion(emotion) {
  character.src = `/sprites/${emotion}.png`;
}

function animateText(text, callback) {
  let i = 0;
  const messageEl = document.createElement('div');
  messageEl.classList.add('message', 'bot');
  chatBox.appendChild(messageEl);

  const interval = setInterval(() => {
    messageEl.innerHTML += text[i];
    i++;
    chatBox.scrollTop = chatBox.scrollHeight;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 50);
}

function sendQuestion() {
  const question = userInput.value.trim();
  if (!question) return;

  const userMessage = document.createElement('div');
  userMessage.classList.add('message', 'user');
  userMessage.textContent = question;
  chatBox.appendChild(userMessage);
  chatBox.scrollTop = chatBox.scrollHeight;

  userInput.value = '';
  setCharacterEmotion('thinking');

  fetch('/api/ask', {
    method: 'POST',
    body: JSON.stringify({ question }),
  })
  .then(res => res.json())
  .then(data => {
    setCharacterEmotion(data.emotion);
    animateText(data.text, () => setCharacterEmotion('neutral'));
  });
}

sendBtn.addEventListener('click', sendQuestion);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendQuestion();
});
