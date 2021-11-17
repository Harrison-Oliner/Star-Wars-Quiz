


var questions = [
    {
        title: "How long did it take the Millennium Falcon to complete the Kessel Run?:",
        choices: ["Less than 12 parsecs", "13 miliseconds", "15 to 20 parsecs", "just over 22 parsecs"],
        answer: "Less than 12 parsecs"
      },
      {
        title: "Who was the original owner of the Millennium Falcon?",
        choices: ["Lando Calrissian", "Obi-Wan Kenobi", "Chewbacca", "Han Solo"],
        answer: "Lando Calrissian"
      },
      {
        title: "Where is Han Solo when he is frozen in carbonite?",
        choices: [
          "Planet Corellia",
          "Planet Tatooine",
          "Cloud City",
          "The Death Star"
        ],
        answer: "Cloud City"
      },
      {
        title:
          "Which planet is under a Trade Federation blockade in Star Wars: The Phantom Menace?",
        choices: ["Planet Kamino", "Planet Naboo", "Planet Jedha", "Planet Kessel"],
        answer: "Planet Naboo"
      },
      {
        title:
          "Chewbacca is known for using what type of weapon?",
        choices: ["Club", "Blaster handgun", "Lightsaber", "Bowcaster"],
        answer: "Bowcaster"
      }
    ];

var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");
var secondsLeft = 100;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

timer.addEventListener("click", function () {
  if (holdInterval === 0) {
    holdInterval = setInterval(function () {
      secondsLeft--;
      currentTime.textContent = "Time: " + secondsLeft;

      if (secondsLeft <= 0) {
        clearInterval(holdInterval);
        allDone();
        currentTime.textContent = "Time's up!";
      }
    }, 1000);
  }
  render(questionIndex);
});

function render(questionIndex) {
  questionsDiv.innerHTML = "";
  ulCreate.innerHTML = "";
  for (var i = 0; i < questions.length; i++) {
    var userQuestion = questions[questionIndex].title;
    var userChoices = questions[questionIndex].choices;
    questionsDiv.textContent = userQuestion;
  }
  userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    questionsDiv.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", compare);
  });
}
function compare(event) {
  var element = event.target;

  if (element.matches("li")) {
    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", "createDiv");
    if (element.textContent == questions[questionIndex].answer) {
      score++;
      sfxRight.play();
      createDiv.textContent =
        "Correct! The answer is:  " + questions[questionIndex].answer;
    } else {
      sfxWrong.play();
      secondsLeft = secondsLeft - penalty;
      createDiv.textContent =
        "Wrong! The correct answer is:  " + questions[questionIndex].answer;
    }
  }

  questionIndex++;
  if (questionIndex >= questions.length) {
    allDone();
    createDiv.textContent =
      "End of quiz!" +
      " " +
      "You got  " +
      score +
      "/" +
      questions.length +
      " Correct!";
  } else {
    render(questionIndex);
  }
  questionsDiv.appendChild(createDiv);
}

function allDone() {
  questionsDiv.innerHTML = "";
  currentTime.innerHTML = "";

  var createH1 = document.createElement("h1");
  createH1.setAttribute("id", "createH1");
  createH1.textContent = "All Done!";
  questionsDiv.appendChild(createH1);

  var createP = document.createElement("p");
  createP.setAttribute("id", "createP");

  questionsDiv.appendChild(createP);

  //remaining time
  if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createP2 = document.createElement("p");
    clearInterval(holdInterval);
    createP.textContent = "Your final score is: " + timeRemaining;
    questionsDiv.appendChild(createP2);
  }

  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "createLabel");
  createLabel.textContent = "Enter your initials: ";
  questionsDiv.appendChild(createLabel);

  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";
  questionsDiv.appendChild(createInput);

  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "Submit");
  createSubmit.textContent = "Submit";
  questionsDiv.appendChild(createSubmit);

  createSubmit.addEventListener("click", function () {
    var initials = createInput.value;

    if (initials === null) {
      console.log("No value entered!");
    } else {
      var finalScore = {
        initials: initials,
        score: timeRemaining,
      };
      console.log(finalScore);
      var allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      var newScore = JSON.stringify(allScores);
      localStorage.setItem("allScores", newScore);

      window.location.replace("./highscores.html");
    }
  });
}
