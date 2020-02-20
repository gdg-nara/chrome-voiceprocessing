const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');
const resultDiv = document.querySelector('#result-div');

SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();

recognition.lang = 'en';
recognition.interimResults = true;
recognition.continuous = true;

let finalTranscript = '';

recognition.onresult = (event) => {
  let interimTranscript = '';
  for (let i = event.resultIndex; i < event.results.length; i++) {
    let transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript;
    } else {
      interimTranscript = transcript;
    }
  }
  resultDiv.innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</i>';
}

startBtn.onclick = () => {
  recognition.start();
}
stopBtn.onclick = () => {
  recognition.stop();
}

// Web Speech

/*
if (!"speechSynthesis" in window) {
  $("#msg").html(
    "Sorry. Your browser <strong>does not support</strong> speech synthesis."
  );
} else {
  $("#msg").html("👍Your browser supports speech synthesis.");
}
*/

// Fetch the list of voices and populate the voice options.
function loadVoices() {
  // Fetch the available voices in English US.
  let voices = speechSynthesis.getVoices();
  $("#voice-names").empty();
  voices.forEach(function(voice, i) {
    const $option = $("<option>");
    $option.val(voice.name);
    $option.text(voice.name + " (" + voice.lang + ")");
    $option.prop("selected", voice.name === "Google US English");
    $("#voice-names").append($option);
  });
}

// Execute loadVoices.
loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function(e) {
  loadVoices();
};

const uttr = new SpeechSynthesisUtterance();

// Set up an event listener for when the 'speak' button is clicked.
// Create a new utterance for the specified text and add it to the queue.
$("#speak-btn").click(function() {
  uttr.text = $("#text").val();
  uttr.rate = parseFloat($("#rate").val());
  // If a voice has been selected, find the voice and set the
  // utterance instance's voice attribute.
  if ($("#voice-names").val()) {
    uttr.voice = speechSynthesis
      .getVoices()
      .filter(voice => voice.name == $("#voice-names").val())[0];
  }
  speechSynthesis.speak(uttr);
  uttr.onend = function() {
    // hoge
  };
});
$("#pause-btn").click(function() {
  speechSynthesis.pause();
});
$("#resume-btn").click(function() {
  speechSynthesis.resume();
});
$("#cancel-btn").click(function() {
  speechSynthesis.cancel();
});
