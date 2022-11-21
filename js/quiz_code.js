const questions = [
  {
    question: "Which of these animals are llamas related to?",
    answers: ["Zebras", "Camels", "Horses"],
    correct: 2,
  },
  {
    question: "How tall can llamas grow??",
    answers: ["2 meters", "4 meters", "8 meters"],
    correct: 1,
  },
  {
    question: "What is a group of llamas called?",
    answers: ["A univercity of lamas", "A herd of lamas", "A brood of lamas"],
    correct: 3,
  },
  {
    question: "How many stomach's does a llama's have?",
    answers: ["5", "2", "8"],
    correct: 2,
  },
];


const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const btnSubmit = document.querySelector("#submit");

let questionIndex = 0;
let score = 0;
clearHTML();
showQuestion();
btnSubmit.onclick = checkAnswer;

function clearHTML() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}

function showQuestion() {
  questions[questionIndex];

  const headerTitle = `<h2 class="title">%title%</h2>`;
  const title = headerTitle.replace(
    "%title%",
    questions[questionIndex]["question"]
  );
  headerContainer.innerHTML = title;

  let answerIndex = 1;
  for (answeText of questions[questionIndex]["answers"]) {

    const questionsTemplate = `<li class="quiz-item">
        <label for="">
            <input value="%number%" type="radio" class="answer" name="answer">
            <span>%list%</span>
        </label>
    </li>`;

    const answerHTML = questionsTemplate
      .replace("%list%", answeText)
      .replace("%number%", answerIndex);

    listContainer.innerHTML += answerHTML;
    answerIndex++;
  }

}

function checkAnswer() {
  console.log("Check answer started");
  const checkedRadio = listContainer.querySelector(
    'input[type = "radio"]:checked'
  );

  if (!checkedRadio) {
    return;
  }

let answerValue = parseInt(checkedRadio.value)
  if (answerValue === questions[questionIndex]["correct"]) {
    score++;
    console.log("good job")
  }

  console.log(score)

  if(questionIndex !== questions.length - 1){
    questionIndex++;
    clearHTML();
    showQuestion();
    return
  }
  else {
    clearHTML();
    showResults();
  }
}

function showResults() {
    // let headerTitle = `<h2 class="title">%finalTitle%</h2>`;
    // let finalTitle = headerTitle.replace('%finalTitle%', 'Hooray 🤘');
    // headerContainer.innerHTML = finalTitle;

    let resultTemplate = `<h2 class="title">%title%</h2>
    <h3 class="message">%message%</h3>
    <p class="result">%finalScore%</p>`

    let title, message;
    if(score === questions.length){
        title = 'Hooray 🤘';
        message = 'You are Lama legent!'
    }
    else if((score*100) / questions.length >= 50){
        title = 'Heh 👌';
        message = 'Not bad!'
    }
    else{
        title = 'Well...😅';
        message = 'You not a Lama person'
    }

    let result = `${score} out of ${questions.length}`;

    const finalMessage = resultTemplate
    .replace('%title%', title)
    .replace('%message%', message)
    .replace('%finalScore%', result);

    headerContainer.innerHTML = finalMessage;

    btnSubmit.innerHTML = 'Start again';
    btnSubmit.onclick = function() {
        history.go()
    }
}
