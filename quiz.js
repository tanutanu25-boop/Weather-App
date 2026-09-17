const questions = [
  {
    question: "HTML stands for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks Text Mark Language",
      "None of these"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which tag is used to create a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    answer: "<a>"
  },
  {
    question: "Which tag is used to show images?",
    options: ["<img>", "<image>", "<src>", "<pic>"],
    answer: "<img>"
  },
  {
    question: "CSS stands for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which CSS property changes text color?",
    options: ["text-color", "font-color", "color", "background"],
    answer: "color"
  },
  {
    question: "Which CSS property controls outer spacing?",
    options: ["padding", "margin", "border", "spacing"],
    answer: "margin"
  },
  {
    question: "Which keyword declares a variable in JS?",
    options: ["var", "int", "string", "float"],
    answer: "var"
  },
  {
    question: "Which symbol is for single-line comments?",
    options: ["//", "/* */", "<!-- -->", "#"],
    answer: "//"
  },
  {
    question: "Which function prints to console?",
    options: ["print()", "console.log()", "write()", "output()"],
    answer: "console.log()"
  },
  {
    question: "Which event occurs on button click?",
    options: ["onchange", "onmouseover", "onclick", "onload"],
    answer: "onclick"
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correctAnswer = questions[currentQuestion].answer;
  const buttons = document.querySelectorAll("#options button");

  buttons.forEach(btn => {
    btn.disabled = true;

    if (btn.innerText === correctAnswer) {
      btn.classList.add("correct");
    }

    if (btn.innerText === selected && selected !== correctAnswer) {
      btn.classList.add("wrong");
    }
  });

  if (selected === correctAnswer) {
    score++;
  }

  setTimeout(() => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      localStorage.setItem("score", score);
      localStorage.setItem("total", questions.length);
      window.location.href = "results.html";
    }
  }, 1000);
}

loadQuestion();
