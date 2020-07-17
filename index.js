const messageElement = document.getElementById("message");

const randomNumber = generateRandomNumber();

console.log(`Number: ${randomNumber}`);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if ("SpeechRecognition" in window) {
  console.log("Speech Recogniiton API Supported");
} else {
  console.log("Speeach Recogniiton API not Supported");
}

let recognition = new window.SpeechRecognition();

/**
 This recognition object has many properties, methods and event handlers.

 Properties:    
1. recognition.grammars       2. recognition.lang   3. recognition.continuous 
4. recognition.interimResults (default: false)     5. recognition.maxAlternatives (default: 1)
6. recognition.serviceURI


Methods: 
1.recognition.abort()    2. recognition.start()         3. recognition.stop()


Event Handlers :

1. recognition.onaudiostart  2. recognition.onaudioend   3. recognition.onend      4. recognition.onerror
5. recognition.onnomatch     6. recognition.onresult     7. recognition.onsoundstart    8. recognition.onsoundend
9. recognition.onspeechstart    10. recognition.onspeechend       11. recognition.onstart

 */

//Start Recognition & Game..

recognition.start();

// Capture User Speech..

function onSpeak(e) {
  const message = e.results[0][0].transcript;

  writeMessage(message);
  checkMessage(message);
}

// Write what user Speaks..
function writeMessage(message) {
  messageElement.innerHTML = `<div> You Said </div>
  <span class = "box"> ${message} </span>`;
}

// Check if User Speech words are actually  Numbers

function checkMessage(message) {
  const num = +message;

  // Check if the Number is Valid...

  if (Number.isNaN(num)) {
    messageElement.innerHTML += "<div> That is Not a Valid Number</div>";
    return;
  }

  //Check the number in the range of (1 - 100)

  if (num > 100 || num < 1) {
    messageElement.innerHTML += "<div> Number must be between 1 & 100.</div>";
    return;
  }

  // Check the Number to Generated Random Number.

  if (num === randomNumber) {
    document.body.innerHTML = `
    <h2> Congrats! You have Guessed the Number ! <br><br>
    It was ${num}</h2>
    <button class = "play-again" id ="play-again">Play Again</button>`;
  } else if (num > randomNumber) {
    messageElement.innerHTML += "<div> Go Lower</div>";
  } else {
    messageElement.innerHTML += "<div> GO Higher</div>";
  }
}

//Generate  a Random Number between  (1 - 100) including 1 but excluding 100..

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

//Speak Result..
recognition.addEventListener("result", onSpeak);

//End Speech Recognition Service

recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
