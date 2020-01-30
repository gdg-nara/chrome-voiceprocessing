var btn = document.getElementById('btn');
//var content = document.getElementById('content');
var textarea = document.getElementById('textarea1');


SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true; // これこれ

recognition.onresult = (event) => {
  console.log(event.results);
}

recognition.start();

/*
//音声認識APIの使用
SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const speech = new SpeechRecognition();
speech.interimResults = true;

//言語を日本語に設定
speech.lang = "en";

//ボタンクリックで認識開始
btn.addEventListener('click', function() {
  speech.start();
});

//認識されたテキストを使って処理を分岐
speech.addEventListener('result', function(e) {
  console.log(e);
  var text = e.results[0][0].transcript;
  textarea.value += text + '\n';
  console.log(text);
});
*/