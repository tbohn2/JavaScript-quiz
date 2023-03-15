var top = document.querySelector("#top")
var scorelink = document.querySelector("#scorelink")
var box = document.querySelector("#box")
var heading = document.querySelector("#heading")
var btn = document.querySelector("#startbtn")
var instructions = document.querySelector("#instructions")
var list = document.querySelector("#list")


var questions = ["Which of the following is not a data type in JS?", "Which of the following is NOT a loop in JavaScript?",
    "What is the output of the following code? var a = 5; console.log(++a)", "Which of the following is the correct way to declare a variable in JavaScript?"]
var ansarray = ["String Boolean Integer Undefined"]

function nextQuestion(event) {
    event.preventDefault();
    btn.remove()
    instructions.remove()
    for (let i = 0; i < questions.length; i++) {
        let question = questions[i];
        heading.innerText = question;
        let answers = ansarray[i].split(" ")
        console.log(answers);
        let li1 = document.createElement("button")
        let li2 = document.createElement("li")
        let li3 = document.createElement("li")
        let li4 = document.createElement("li")
        li1.innerText = answers
        list.appendChild(li1)
        break
        // resume
    }
}

btn.addEventListener("click", nextQuestion);
