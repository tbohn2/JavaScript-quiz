var top = document.querySelector("#top")
var timer = document.querySelector("#timer")
var scorelink = document.querySelector("#scorelink")
var box = document.querySelector("#box")
var heading = document.querySelector("#heading")
var btn = document.querySelector("#startbtn")
var instructions = document.querySelector("#instructions")
var list = document.querySelector("#list")
var reaction = document.querySelector("#reaction")
var index = 0
var timeLeft = 80

var questions = ["Which of the following is not a data type in JS?", "Which of the following is NOT a loop in JavaScript?",
    "What is the output of the following code? var a = 5; console.log(++a)", "Which of the following is the correct way to declare a variable in JavaScript?"]
var ansarray = [["String", "Boolean", "Integer", "Undefined"], ["for loop", "while loop", "do-while loop", "switch loop"],
["5", "6", "7", "4"], ["var variableName = value", "variableName = value", "value = variableName", "declare variableName = value"]]
var correctans = ["Integer", "switch loop", "6", "var variableName = value"]


function keepTime() {
    let int = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft -= 1
            timer.innerText = "Timer: " + timeLeft
        }
        else if (timeLeft <= 0) {
            if (heading.innerHTML = "You Did It!") {

            }
            else {
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
        }

    }, 1000)
}

function restart() {
    location.reload()
}

function firstQuestion(event) {
    event.preventDefault()
    btn.remove()
    instructions.remove()
    heading.innerText = questions[index]
    timer.innerText = "Timer: 80"
    keepTime()
    displayanswers()
}

function nextQuestion(event) {
    event.preventDefault()
    let selection = event.target.innerText
    if (selection == correctans[index]) {
        reaction.innerText = "Correct!"
        setTimeout(() => {
            reaction.innerText = ""
        }, 1000);
        index += 1
        heading.innerText = questions[index]
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
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
    else {
        timeLeft -= 10
        timer.innerText = "Timer: " + timeLeft
        reaction.innerText = "Incorrect, try again!"
    }
}

function displayanswers() {
    let i = index
    let answers = ansarray[index].splice(" ")
    for (let i = 0; i < answers.length; i++) {
        let li = document.createElement("li")
        let lib = document.createElement("button")
        lib.setAttribute("class", "btn")
        lib.setAttribute("id", "choices")
        lib.innerText = answers[i]
        li.appendChild(lib)
        list.appendChild(li)
        lib.addEventListener("click", nextQuestion);
    }
}

function inputscore() {
    let yourscore = document.createElement("p")
    box.appendChild(yourscore)
    yourscore.innerText = "Your final score is " + timeLeft
    let submitbox = document.createElement("div")
    box.appendChild(submitbox)
    let label = document.createElement("label")
    label.innerText = "Initials here: "
    submitbox.appendChild(label)
    let input = document.createElement("input")
    submitbox.appendChild(input)
    let submitbtn = document.createElement("button")
    submitbtn.setAttribute("class", "btn")
    submitbtn.innerText = "Submit"
    submitbox.appendChild(submitbtn)


}


btn.addEventListener("click", firstQuestion);



