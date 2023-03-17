var top = document.querySelector("#top")
var timer = document.querySelector("#timer")
var scorelink = document.querySelector("#scorelink")
var box = document.querySelector("#box")
var heading = document.querySelector("#heading")
var btn = document.querySelector("#startbtn")
var instructions = document.querySelector("#instructions")
var list = document.querySelector("#list")
var index = 0
var timeLeft = 3

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
        if (timeLeft === 0) {
            clearInterval(int)
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

function restart() {
    console.log("yo mama");
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
        index += 1
        heading.innerText = questions[index]
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
        displayanswers()
    }

    else {
        let tryagain = document.createElement("p")
        tryagain.innerText = "That is incorrect, try again"
        document.body.appendChild(tryagain)
        setInterval(function deleteTryAgain() {
            tryagain.remove()
        }, 700)
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


function youLose() {

}
setTimeout(youLose, 80000)

btn.addEventListener("click", firstQuestion);



