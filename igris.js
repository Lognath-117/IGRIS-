const btn = document.getElementById('mic-btn');
const transcriptDiv = document.getElementById('transcript');
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
recognition.lang = 'en-US';

recognition.onresult = function(event) {
  const speechResult = event.results[0][0].transcript;
  transcriptDiv.innerHTML += '<p>User: ' + speechResult + '</p>';

  fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: speechResult })
  })
  .then(response => response.json())
  .then(data => {
    transcriptDiv.innerHTML += '<p>IGRIS: ' + data.reply + '</p>';
    speak(data.reply);
  });
}

function speak(message) {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(message);
  synth.speak(utterThis);
}

btn.onclick = () => {
  recognition.start();
};
