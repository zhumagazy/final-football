const resBtn = document.querySelector("#res-btn");
const startOverBtn = document.querySelector("#start-over-btn");
const resultContainer = document.querySelector(".result-container");
const resultContainerCloseBtn = document.querySelector("#res-cont-close-btn");
const scoreInputOne = document.querySelector("#team-one-score");
const scoreInputTwo = document.querySelector("#team-two-score");
const winner = document.querySelector("#winner-team");
const teamOneTotalScore = document.querySelector("#team-one-total-score");
const teamTwoTotalScore = document.querySelector("#team-two-total-score");
const teamOnePlayers = document.querySelector("#team-one-players");
const teamTwoPlayers = document.querySelector("#team-two-players");
const teamOneScoreCombinations = document.querySelector(
  "#team-one-scores-combination"
);
const teamTwoScoreCombinations = document.querySelector(
  "#team-two-scores-combination"
);

MAX_SCORE = 7;
MAX_PLAYERS = 11;

const clearScores = () => {
  scoreInputOne.value = "";
  scoreInputTwo.value = "";
};
const clearPlayers = () => {
  teamOnePlayers.value = "";
  teamTwoPlayers.value = "";
};

const showWinner = () => {
  if (parseInt(scoreInputOne.value) > parseInt(scoreInputTwo.value)) {
    winner.textContent = "Team One";
  } else if (parseInt(scoreInputOne.value) < parseInt(scoreInputTwo.value)) {
    winner.textContent = "Team Two";
  } else if (parseInt(scoreInputOne.value) === parseInt(scoreInputTwo.value)) {
    winner.textContent = "Draw";
  }
};

const showTotalScore = () => {
  teamOneTotalScore.textContent = scoreInputOne.value;
  teamTwoTotalScore.textContent = scoreInputTwo.value;
};

const showPlayers = () => {
  const teamOne = teamOnePlayers.value
    .split(",")
    .map((player) => player.trim());
  const teamTwo = teamTwoPlayers.value
    .split(",")
    .map((player) => player.trim());
  teamOne.forEach((player) => {
    console.log(`${player} - Team One`);
  });
  teamTwo.forEach((player) => {
    console.log(`${player} - Team Two`);
  });
};
const generateScoreComboRecursion = function (
  score,
  current_sum,
  start,
  result,
  output
) {
  if (current_sum === score) {
    output.push(result.slice());
  }

  for (let i = start; i < score; i++) {
    let temp_sum = current_sum + i;
    if (temp_sum <= score) {
      result.push(i);
      generateScoreComboRecursion(score, temp_sum, i, result, output);
      result.pop();
    } else {
      return;
    }
  }
};

const generateScoreCombo = function (score) {
  let output = [];
  let result = [];
  generateScoreComboRecursion(score, 0, 1, result, output);
  return output;
};

const showTeamOneScoreCombinations = (input, place) => {
  const scores = parseInt(input.value);
  if (scores === 0) {
    place.textContent = "0";
    return;
  }
  const result = generateScoreCombo(scores);
  let text = "";
  for (let i = 0; i < result.length; i++) {
    text += `(${result[i]})`;
  }
  text += `(${scores})`;
  place.textContent = text;
};

const checkPlayersNumber = (input) => {
  const playersString = input.value.toString();
  let numberOfPlayers = (playersString.match(/,/g) || []).length + 1;
  if (numberOfPlayers === 11) return true;
  return false;
};

const resultFunction = () => {
  showWinner();
  showTotalScore();
  showPlayers();
  showTeamOneScoreCombinations(scoreInputOne, teamOneScoreCombinations);
  showTeamOneScoreCombinations(scoreInputTwo, teamTwoScoreCombinations);
};

resBtn.addEventListener("click", () => {
  if (
    scoreInputOne.value === "" ||
    scoreInputTwo.value === "" ||
    teamOnePlayers.value === "" ||
    teamTwoPlayers.value === "" ||
    scoreInputOne.value < 0 ||
    scoreInputTwo.value < 0
  ) {
    alert("Please enter valid scores and players");
    return;
  }
  if (
    !checkPlayersNumber(teamOnePlayers) ||
    !checkPlayersNumber(teamTwoPlayers)
  ) {
    alert("Number of players should be eqaul to 11");
    return;
  }
  resultContainer.style.display = "flex";
  resultFunction();
});

resultContainerCloseBtn.addEventListener("click", () => {
  resultContainer.style.display = "none";
});

startOverBtn.addEventListener("click", () => {
  resultContainer.style.display = "none";
  clearScores();
  clearPlayers();
});

scoreInputOne.oninput = () => {
  if (parseInt(scoreInputOne.value) > MAX_SCORE) {
    scoreInputOne.value = "";
    alert("Individual team scores cannot be grater than 7!");
    return;
  }
  if (
    parseInt(scoreInputOne.value) + parseInt(scoreInputTwo.value) >
    MAX_SCORE
  ) {
    scoreInputOne.value = "";
    alert("Combined scores cannot be grater than 7!");
    return;
  }
};

scoreInputTwo.oninput = () => {
  if (parseInt(scoreInputTwo.value) > MAX_SCORE) {
    scoreInputTwo.value = "";
    alert("Individual team scores cannot be grater than 7!");
    return;
  }
  if (
    parseInt(scoreInputOne.value) + parseInt(scoreInputTwo.value) >
    MAX_SCORE
  ) {
    scoreInputTwo.value = "";
    alert("Combined scores cannot be grater than 7!");
    return;
  }
};
