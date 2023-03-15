var top = document.querySelector("#top")
var scorelink = document.querySelector("#scorelink")
var box = document.querySelector("#box")
var heading = document.querySelector("#heading")
var btn = document.querySelector("#startbtn")
var instructions = document.querySelector("#instructions")
var list = document.querySelector("#list")


var questions = ["Which of the following is not a data type in JS?", "Which of the following is NOT a loop in JavaScript?",
    "What is the output of the following code? var a = 5; console.log(++a)", "Which of the following is the correct way to declare a variable in JavaScript?"]
var ansarray = [["String", "Boolean", "Integer", "Undefined"]]

function nextQuestion(event) {
    event.preventDefault();
    btn.remove()
    instructions.remove()
    for (let i = 0; i < questions.length; i++) {
        let question = questions[i];
        heading.innerText = question;
        let answers = ansarray[i].splice(" ")
        console.log(answers);
        for (let i = 0; i < answers.length; i++) {
            let li = document.createElement("li")
            let lib = document.createElement("button")
            lib.setAttribute("class", "btn")
            lib.innerText = answers[i]
            li.appendChild(lib)
            list.appendChild(li)
        }
        // let li1 = document.createElement("li")
        // let li2 = document.createElement("li")
        // let li3 = document.createElement("li")
        // let li4 = document.createElement("li")
        // let li1b = document.createElement("button")
        // li1b.innerText = answers[0]
        // li2.innerText = answers[1]
        // li3.innerText = answers[2]
        // li4.innerText = answers[3]
        // li1.appendChild(li1b)
        // list.appendChild(li1)
        // list.appendChild(li2)
        // list.appendChild(li3)
        // list.appendChild(li4)
        break
        // resume
    }
}

btn.addEventListener("click", nextQuestion);
