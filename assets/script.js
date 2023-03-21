var top = document.querySelector("#top")
var timer = document.querySelector("#timer")
var scorelink = document.querySelector("#scorelink")
var box = document.querySelector("#box")
var heading = document.querySelector("#heading")
var btn = document.querySelector("#startbtn")
var instructions = document.querySelector("#instructions")
var list = document.querySelector("#list")
var reaction = document.querySelector("#reaction")
var scorebuttons = document.querySelector("#scorebuttons")
var index = 0
var timeLeft = 80
// highscores is set to the data in the local storage; if there is no data, highscores is an empty array
var highscores = JSON.parse(localStorage.getItem("score"))
if (highscores == null) {
    highscores = []
}
// Array of JS questions
var questions = ["Which of the following is not a data type in JS?", "Which of the following is NOT a loop in JavaScript?",
    "What is the output of the following code? var a = 5; console.log(++a)", "Which of the following is the correct way to declare a variable in JavaScript?"]
// Array container array of answers to each question
var ansarray = [["String", "Boolean", "Integer", "Undefined"], ["for loop", "while loop", "do-while loop", "switch loop"],
["5", "6", "7", "4"], ["var variableName = value", "variableName = value", "value = variableName", "declare variableName = value"]]
// Correct answer for each question
var correctans = ["Integer", "switch loop", "6", "var variableName = value"]

// Timer subtracts 1 every second and displays time left
function keepTime() {
    let int = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft -= 1
            timer.innerText = "Timer: " + timeLeft
        }
        // If the timer ran out and the text does not read "You did it!" or "Highscores", which indicate
        // the user made it to the end of the quiz, the timer will stop, and losing screen is displayed
        else if (timeLeft <= 0 && heading.innerHTML !== "You did it!" && heading.innerHTML !== "Highscores") {
            clearInterval(int)
            reaction.innerText = ""
            timer.innerText = "Timer: 0"
            heading.innerText = "You Ran Out of Time"
            while (list.hasChildNodes()) {
                list.removeChild(list.firstChild);
            }
            let restartbtn = document.createElement("button")
            restartbtn.setAttribute("class", "btn")
            restartbtn.innerText = "Press to Try Again"
            box.appendChild(restartbtn)
            restartbtn.addEventListener("click", restart);
        }
    }, 1000)
}

// Function to refresh page
function restart() {
    location.reload()
}

// When start button is clicked, the quiz begins with firstQuestion function
btn.addEventListener("click", firstQuestion);

// Function to remove the start page, start timer and add question 1
function firstQuestion(event) {
    event.preventDefault()
    btn.remove()
    instructions.remove()
    heading.innerText = questions[index]
    timer.innerText = "Timer: 80"
    keepTime()
    displayanswers()
}

// Function to check if input is the correct answer
function nextQuestion(event) {
    event.preventDefault()
    let selection = event.target.innerText
    // If answer is correct, it will say correct and move to next question
    if (selection == correctans[index]) {
        reaction.innerText = "Correct!"
        // Makes "Correct!" disappear after half a second
        setTimeout(() => {
            reaction.innerText = ""
        }, 500);
        // Increases index by 1 and displays question[index]
        index += 1
        heading.innerText = questions[index]
        // Removes the answers to the previous question
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
        // If the last question is answered correctly, causing the index value to be larger than than length
        // of the questions array, elements are removed and "You did it!" is displayed
        if (index > questions.length - 1) {
            heading.innerText = "You did it!"
            timer.remove()
            list.remove()
            reaction.remove()
            inputscore()
        }
        else {
            displayanswers()
        }
    }
    // If the right answer is not selected, 10 is subtracted from the timer and user is told it is incorrect
    else {
        timeLeft -= 10
        timer.innerText = "Timer: " + timeLeft
        reaction.innerText = "Incorrect, try again!"
    }
}

// Function that displays possible answers
function displayanswers() {
    // The array within the answer array located at the index position is spliced into four
    let answers = ansarray[index].splice(" ")
    // For loop creates a button for each answer
    for (let i = 0; i < answers.length; i++) {
        // Creates li element and button element
        let li = document.createElement("li")
        let lib = document.createElement("button")
        // Sets lib class and id for style and identification
        lib.setAttribute("class", "btn")
        lib.setAttribute("id", "choices")
        // Answer text is inserted into answer buttons
        lib.innerText = answers[i]
        // Button is appended to li element and li is appended to the list
        li.appendChild(lib)
        list.appendChild(li)
        // When one of the answers is clicked, it is checked with the function nextQuestion
        lib.addEventListener("click", nextQuestion);
    }
}

// Function to save score and initials into local storage
function inputscore() {
    // Creates p element to display user's final score
    let yourscore = document.createElement("p")
    box.appendChild(yourscore)
    yourscore.innerText = "Your final score is " + timeLeft
    // Creates div element to place input and button and appends it to container
    let submitbox = document.createElement("div")
    box.appendChild(submitbox)
    // Creates text before input w/ instructions "Initials here" and appends to div
    let label = document.createElement("label")
    label.innerText = "Initials here: "
    submitbox.appendChild(label)
    // Creates input element and appends to div
    let input = document.createElement("input")
    // Limits initials input to two letters
    input.setAttribute("maxlength", "2")
    submitbox.appendChild(input)
    // Creates button, gives it a class and inner text, and appends to div
    let submitbtn = document.createElement("button")
    submitbtn.setAttribute("class", "btn")
    submitbtn.innerText = "Submit"
    submitbox.appendChild(submitbtn)
    // Button causes saveHighscore function to be called when clicked
    submitbtn.addEventListener("click", saveHighscore)
    // Function to save score to local storage
    function saveHighscore() {
        // Creates an object containing the user's initials and score
        let highscore = {
            initials: input.value.trim().toUpperCase(),
            score: timeLeft
        }
        // Adds new score to the existing array of highscores
        highscores.push(highscore)
        // Stingifies and stores all highscores, including the one that was just added
        localStorage.setItem("score", JSON.stringify(highscores))
        // Removes submit and user's score from page
        submitbox.remove()
        yourscore.remove()
        // Calls showHighscores function
        showHighscores()
    }
}

// Function to show scores saved in local storage
function showHighscores() {
    heading.innerText = "Highscores"
    // Elements to be removed if user presses scorelink on web page or if new score is submitted
    scorelink.remove()
    timer.remove()
    list.remove()
    instructions.remove()
    btn.remove()
    reaction.remove()
    // Ordered list is created and appended to container
    let scorelist = document.createElement("ol")
    box.appendChild(scorelist)
    // Highscores are order from highest score to lowest score
    highscores.sort(function (a, b) { return b.score - a.score })
    // for loop creates li element, styles it, and appends it to ordered list
    for (let i = 0; i < highscores.length; i++) {
        let rank = document.createElement("li")
        rank.setAttribute("class", "highscoreli")
        // Sets text equal to initials and score for each element in highscores array stored in local storage
        rank.innerText = highscores[i].initials + " - " + highscores[i].score
        scorelist.appendChild(rank)
    }
    // Creates restart and clear highscores buttons and appends them 
    let restartbtn = document.createElement("button")
    let clearbtn = document.createElement("button")
    restartbtn.setAttribute("class", "btn")
    clearbtn.setAttribute("class", "btn")
    restartbtn.innerText = "Go Back"
    clearbtn.innerText = "Clear Highscores"
    scorebuttons.appendChild(restartbtn)
    scorebuttons.appendChild(clearbtn)
    // Clicking restart button will refresh page with restart() function
    restartbtn.addEventListener("click", restart);
    // Clicking the clear highscores button deletes data stored under the key "score" in local storage
    clearbtn.addEventListener("click", clearScores);
    function clearScores() {
        localStorage.removeItem("score")
        scorelist.remove()
    }
}

// If link is clicked, calls the showHighscores function
scorelink.addEventListener("click", showHighscores)