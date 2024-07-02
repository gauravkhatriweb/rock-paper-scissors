let user1Score = 0;
let user2Score = 0;
let computerScore = 0;
let isUserVsUser = false;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const user1ScoreElem = document.querySelector("#user1-score");
const user2ScoreElem = document.querySelector("#user2-score");
const computerScoreElem = document.querySelector("#computer-score");
const resetBtn = document.querySelector("#reset-btn");
const userVsComputerBtn = document.querySelector("#user-vs-computer");
const userVsUserBtn = document.querySelector("#user-vs-user");
const leaderboardList = document.querySelector("#leaderboard-list");
const themeToggle = document.querySelector("#theme-toggle");

const genComputerChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        user1Score++;
        msg.style.backgroundColor = "green";
    } else {
        computerScore++;
        msg.innerText = `You Lose! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
    updateScores();
}

const showUserVsUserWinner = (user1Win, user1Choice, user2Choice) => {
    if (user1Win) {
        msg.innerText = `User 1 Wins! ${user1Choice} beats ${user2Choice}`;
        user1Score++;
        msg.style.backgroundColor = "green";
    } else {
        user2Score++;
        msg.innerText = `User 2 Wins! ${user2Choice} beats ${user1Choice}`;
        msg.style.backgroundColor = "blue";
    }
    updateScores();
}

const drawGame = () => {
    msg.innerText = "Game Draw!";
    msg.style.backgroundColor = "#081b31";
}

const updateScores = () => {
    user1ScoreElem.innerText = user1Score;
    user2ScoreElem.innerText = user2Score;
    computerScoreElem.innerText = computerScore;
    updateLeaderboard();
}

const updateLeaderboard = () => {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ user1Score, user2Score, computerScore });
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    renderLeaderboard();
}

const renderLeaderboard = () => {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboardList.innerHTML = leaderboard
        .map(
            (entry, index) =>
                `<li>Game ${index + 1}: User 1: ${entry.user1Score}, User 2: ${entry.user2Score}, Computer: ${entry.computerScore}</li>`
        )
        .join("");
}

const playGame = (userChoice) => {
    const compChoice = genComputerChoice();

    console.log(`User choice: ${userChoice}`);
    console.log(`Computer choice: ${compChoice}`);

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }

    console.log(`User Score: ${user1Score}, Computer Score: ${computerScore}`);
}

const playUserVsUserGame = (user1Choice, user2Choice) => {
    console.log(`User 1 choice: ${user1Choice}`);
    console.log(`User 2 choice: ${user2Choice}`);

    if (user1Choice === user2Choice) {
        drawGame();
    } else {
        let user1Win = true;
        if (user1Choice === "rock") {
            user1Win = user2Choice === "paper" ? false : true;
        } else if (user1Choice === "paper") {
            user1Win = user2Choice === "scissors" ? false : true;
        } else {
            user1Win = user2Choice === "rock" ? false : true;
        }
        showUserVsUserWinner(user1Win, user1Choice, user2Choice);
    }
}

const resetGame = () => {
    user1Score = 0;
    user2Score = 0;
    computerScore = 0;
    updateScores();
    msg.innerText = "Play Your Move!";
    msg.style.backgroundColor = "#081b31";
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        if (isUserVsUser) {
            const user2Choice = prompt("User 2: Enter your choice (rock, paper, or scissors):");
            if (["rock", "paper", "scissors"].includes(user2Choice)) {
                playUserVsUserGame(userChoice, user2Choice);
            } else {
                alert("Invalid choice! Please enter rock, paper, or scissors.");
            }
        } else {
            playGame(userChoice);
        }
    });
});

resetBtn.addEventListener("click", resetGame);

userVsComputerBtn.addEventListener("click", () => {
    isUserVsUser = false;
    resetGame();
});
userVsUserBtn.addEventListener("click", () => {
    isUserVsUser = true;
    resetGame();
});

themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark", themeToggle.checked);
});

renderLeaderboard();
