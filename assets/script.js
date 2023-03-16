var top = document.querySelector("#top")
var scorelink = document.querySelector("#scorelink")
var box = document.querySelector("#box")
var heading = document.querySelector("#heading")
var btn = document.querySelector("#startbtn")
var instructions = document.querySelector("#instructions")
var list = document.querySelector("#list")

var index = 0
var currentQuestion


var questions = ["Which of the following is not a data type in JS?", "Which of the following is NOT a loop in JavaScript?",
    "What is the output of the following code? var a = 5; console.log(++a)", "Which of the following is the correct way to declare a variable in JavaScript?"]
var ansarray = [["String", "Boolean", "Integer", "Undefined"], ["for loop", "while loop", "do-while loop", "switch loop"],
["5", "6", "7", "4"], ["var variableName = value", "variableName = value", "value = variableName", "declare variableName = value"]]
var correctans = ["Integer", "switch loop", "6", "var variableName = value"]

function firstQuestion(event) {
    event.preventDefault()
    btn.remove()
    instructions.remove()
    heading.innerText = questions[index]
    displayanswers()
}

function nextQuestion(event) {
    event.preventDefault()
    let selection = event.target.innerText
    console.log(selection);
    console.log(correctans[index]);
    if (selection == correctans[index]) {
        index = index + 1
        heading.innerText = questions[index]
        console.log(list.children);
        while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
        displayanswers()
    } else {
        let tryagain = document.createElement("p")
        tryagain.innerText = "That is incorrect, try again"
        document.body.appendChild(tryagain)
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

// btn.addEventListener("click", buttonPressed);

btn.addEventListener("click", firstQuestion);

// choices.addEventListener("click", nextQuestion);


