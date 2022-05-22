const mainSection = document.getElementById("main");
const startContainer = document.getElementById("banner");
const startBtn = document.getElementById("startBtn");
const alertSection = document.getElementById("message");

let timer = 100;
let questionIndex = 0;

// declear my questions and answers array
const questions = [
  {
    question: "What is a Bombay Duck?",
    answers: [
      "A type of duck",
      "A type of curry",
      "A basketball term",
      "A type of fish",
    ],
    correctAnswer: "A type of fish",
  },
  {
    question:
      "In New Zealand what is it illegal to fly in a hot air balloon with?",
    answers: ["A dog", "A bicycle", "A violin", "A rooster"],
    correctAnswer: "A rooster",
  },
  {
    question:
      " If you dug a hole through the center of the Earth from Wellington, New Zealand, in which European country would you emerge?",
    answers: ["Germany", "Spain", "France", "Poland"],
    correctAnswer: "Spain",
  },
  {
    question: "What is the term for a group of owls?",
    answers: ["Blessing", "Terror", "Confusion", "Parliament"],
    correctAnswer: "Parliament",
  },
  {
    question: "The average person in the US opens what 13 times per day?",
    answers: ["Front door", "A can of soda", "Refrigerator", "A window"],
    correctAnswer: "Refrigerator",
  },
  {
    question: "What is the length of New Zealand's 90 Mile Beach?",
    answers: ["90 miles", "77 miles", "90 km", "55 miles"],
    correctAnswer: "55 miles",
  },
  {
    question: "What are you afriad of if you are Syngenesophobic?",
    answers: ["Syringes", "Genetically modified crops", "Relatives", "Snakes"],
    correctAnswer: "Relatives",
  },
  {
    question:
      "In the Harry Potter book and film series, Professor Dumbledore's name comes from the Old English word for what creature?",
    answers: ["Bumblebee", "Elephant", "Owl", "Unicorn"],
    correctAnswer: "Bumblebee",
  },
];

const renderAnswerAlarm = (message) => {
  // if (document.getElementById("answerAlarm")) {
  //   document.getElementById("answerAlarm").remove();
  // }
  // const alertSection = document.createElement("section");
  // alertSection.setAttribute("class", "correctAnswerAlarm");
  // alertSection.setAttribute("id", "answerAlarm");
  alertSection.textContent = message;
  // mainSection.append(alertSection);
};

const getFromLS = () => {
  // check if we have anything in the LS
  const highscores = localStorage.getItem("highscores");
  if (highscores) {
    // parse object in ls
    return JSON.parse(highscores);
  } else {
    return [];
  }
};

const storeHighscores = (event) => {
  event.preventDefault();
  // get the users name
  const usersName = document.getElementById("full-name").value;
  console.log(usersName);

  const scoreObject = {
    usersName: usersName,
    usersScore: timer,
  };

  const highscores = getFromLS();
  highscores.push(scoreObject);
  localStorage.setItem("highscores", JSON.stringify(highscores));

  renderThankYouBanner();
};

const renderThankYouBanner = () => {
  // store users scores array in usersScore funciton

  const gameoverSection = document.getElementById("feedback-form-section");
  gameoverSection.remove();
  // // creat section element
  const thankyouSection = document.createElement("section");
  thankyouSection.setAttribute("class", "thankyou-section");
  thankyouSection.setAttribute("id", "Banner");

  // create h1 title
  const h1 = document.createElement("h1");
  h1.setAttribute("class", "thankyou-section-title");
  h1.textContent = "Thank you for taking the quiz!";

  // creat h2 info
  const h2 = document.createElement("h2");
  h2.setAttribute("class", "thankyou-section-info");
  h2.textContent = "Do you want to take the quiz again?";

  // creat retry and go-to-high-scores button
  const btn1 = document.createElement("a");
  const btn2 = document.createElement("a");
  btn1.setAttribute("class", "retry-button");
  btn1.setAttribute("id", "retry-button");
  btn1.setAttribute("href", "./index.html");
  btn1.textContent = "Retry";
  btn2.setAttribute("class", "showScores-button");
  btn2.setAttribute("id", "showScores-button");
  btn2.setAttribute("href", "./highscores.html");
  btn2.textContent = "Go to the high Scores";
  thankyouSection.append(h1, h2, btn1, btn2);
  mainSection.append(thankyouSection);
};

const renderGameOver = () => {
  // // creat section element
  const feedbackFormSection = document.createElement("section");
  feedbackFormSection.setAttribute("class", "feedback-form-section");
  feedbackFormSection.setAttribute("name", "feedback-form");
  feedbackFormSection.setAttribute("id", "feedback-form-section");

  // create h2 title
  const h2 = document.createElement("h2");
  h2.setAttribute("class", "feedback-form-title");
  h2.textContent = "let's save your score!";

  // creat h3 info
  const h3 = document.createElement("h3");
  h3.setAttribute("class", "feedback-form-info");
  // h3.textContent = `Your score is: ${getFromLS().usersScore}`;

  // creat form info
  const form = document.createElement("form");
  form.setAttribute("class", "feeeback-form");

  // creat input form and submit button
  const input = document.createElement("input");
  const btn = document.createElement("button");
  input.setAttribute("name", "full-name");
  input.setAttribute("class", "form-input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "full-name");
  input.setAttribute("placeholder", "Enter your full name");
  btn.setAttribute("class", "btn");
  btn.setAttribute("type", "submit");
  btn.textContent = "Submit";
  form.append(input, btn);
  feedbackFormSection.append(h2, h3, form);
  mainSection.append(feedbackFormSection);

  // add click event listener on form submit button to render Thank you banner
  btn.addEventListener("click", storeHighscores);
};

const validateAnswer = (event) => {
  const target = event.target;

  if (target.tagName === "BUTTON") {
    //get the target clicking event for user's answer

    const userAnswer = target.getAttribute("data-value");

    // get the correct answer for each question
    const rightAnswer = questions[questionIndex].correctAnswer;

    //compare the 2 answers and render message
    if (userAnswer === rightAnswer) {
      // render success alert with message and status
      renderAnswerAlarm("You're correct! Keep going!");

      // set timeout for 500ms and then go to next question
    } else {
      // subtract 5 seconds from timerValue
      timer -= 5;
      // render error alert with message and status
      renderAnswerAlarm("Oops, be careful! You have less time now...");
    }

    // if statement to check the last question or not
    if (questionIndex < questions.length - 1) {
      questionIndex += 1;
      removeQuestionSection();
      renderQuestionSection();
    } else {
      // set quizComplete to true and then render form and stop the timer
      removeQuestionSection();
      renderGameOver();
    }
    const clearAlarm = () => {
      // if (document.getElementById("answerAlarm")) {
      //   document.getElementById("answerAlarm").remove();
      // }
      alertSection.textContent = "";
      clearTimeout(alarmTimer);
    };

    const alarmTimer = setTimeout(clearAlarm, 5000);
  }
};

const removeStartSection = () => {
  mainSection.removeChild(startContainer);
};

const removeQuestionSection = () => {
  const questionSection = document.getElementById("question-section");
  mainSection.removeChild(questionSection);
};
const renderQuestionSection = () => {
  // get each question by get the questions array
  const question = questions[questionIndex];

  // creat section element
  const questionSection = document.createElement("section");
  questionSection.setAttribute("class", "question-section");
  questionSection.setAttribute("id", "question-section");

  // create h1 title
  const h1 = document.createElement("h1");
  h1.setAttribute("class", "question-section-title");
  h1.textContent = `Question ${questionIndex + 1}:`;

  // creat h2 info
  const h2 = document.createElement("h2");
  h2.setAttribute("class", "question-section-info");
  h2.textContent = question.question;

  // creat ul info
  const ul = document.createElement("ul");
  ul.setAttribute("class", "answers");

  // creat answers using forEach function
  const createAppendAnswer = (answer) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.setAttribute("class", "answer-button");
    btn.setAttribute("data-value", answer);
    btn.textContent = answer;
    li.append(btn);
    ul.append(li);
  };

  question.answers.forEach(createAppendAnswer);

  // append section and main
  questionSection.append(h1, h2, ul);
  mainSection.append(questionSection);

  // add click event listener on question-section to check answer
  questionSection.addEventListener("click", validateAnswer);
};

const renderTimerSection = () => {
  const timerSpanSection = document.createElement("section");
  timerSpanSection.setAttribute("id", "timerSpanSection");
  timerSpanSection.setAttribute("class", "timerSpanSection");
  timerSpanSection.textContent = "Time Remaining: ";
  const timerSpan = document.createElement("span");
  timerSpan.setAttribute("id", "timerSpan");
  timerSpan.textContent = timer;
  timerSpanSection.append(timerSpan);
  mainSection.append(timerSpanSection);

  const startTimer = () => {
    timer -= 1;
    const timerSpan = document.getElementById("timerSpan");
    timerSpan.textContent = timer;
    if (timer === 0) {
      //render gameover
      clearInterval(timerId);
    }
    if (questionIndex === questions.length - 1) {
      clearInterval(timerId);
    }
  };

  //start the timer coountdown
  const timerId = setInterval(startTimer, 1000);
  // console.log(timerId);
};

const startQuiz = () => {
  removeStartSection();

  // render timerSection and starts the time counting down from 100 second
  renderTimerSection();

  // render question function
  renderQuestionSection();
};

// add event listeners
// add document on load event listener
// add start button click event listener
// window.addEventListener("load", onLoad);
// add event listener to start button
startBtn.addEventListener("click", startQuiz);

// uncompleted functions??
const onLoad = () => {
  // initialise local storage
  // check if highscores exists in LS
  // if false then set highscores to empty array in LS
};

const handleFormSubmit = () => {
  // get value from input
  // check if empty then render error alert with message and status
  // if not empty then create the score object
  // {
  //   fullName: "Bob Smith",
  //   score: 25
  // }
  // push score object to LS
  // render quizCompleteSection
};
