const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

function colorflipper() {
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hex[Math.floor(Math.random() * hex.length)];
  }

  document.body.style.backgroundColor = hexColor;
}

const quoteText = document.querySelector(".quote"),
  quoteBtn = document.querySelector("button"),
  speechBtn = document.querySelector(".speech"),
  copyBtn = document.querySelector(".copy"),
  synth = speechSynthesis;

function randomQuote() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "Loading Quote...";
  fetch("http://api.quotable.io/random")
    .then((response) => response.json())
    .then((result) => {
      quoteText.innerText = result.content;
      quoteBtn.classList.remove("loading");
      quoteBtn.innerText = "New Quote";
    });
}

function newQuote() {
  colorflipper();
  randomQuote();
}

speechBtn.addEventListener("click", () => {
  if (!quoteBtn.classList.contains("loading")) {
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText}`);
    synth.speak(utterance);
    setInterval(() => {
      !synth.speaking
        ? speechBtn.classList.remove("active")
        : speechBtn.classList.add("active");
    }, 10);
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteText.innerText);
});
