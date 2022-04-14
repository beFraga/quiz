//declaring variables
let userAns = [];
//randomizing questions
questions = _.shuffle(questions);
const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const main2 = document.getElementById("main2");
const actions = document.getElementById("actions");

function generationQuestion(index) {
    //randomizing answers
    let answers = _.shuffle(questions[index].ans);
    //take question
    let quest = questions[index].q;
    //putting infos in html
    main2.innerHTML += `<p id="question">${quest}</p>`;
    for (i in answers) {
        main2.innerHTML += `
        <div class="ansD" data-id="${answers[i].id}" data-index="${Number(index) + 1}" onclick="check(this)">
            <p class="answer">${alpha[i]}) ${answers[i].ans}</p>
        </div>`
    }
    actions.innerHTML += `<button onclick="send()">Send</button>`
}
//select answer
function check(me) {
    let sel = document.querySelector(".selected");
    if (sel) {
        sel.classList.remove("selected");
    }
    me.classList.add("selected");
}

function send() {
    let sel = document.querySelector(".selected");
    let ansDiv = document.querySelectorAll(".ansD");
    //remove selected class to the next question
    if (sel) {
        sel.classList.remove("selected");
    }
    //show the correct answer
    for (i of ansDiv) {
        if (realAns.includes(Number(i.dataset.id))) {
            i.style.background = "green";
        } else if (i.dataset.id == sel.dataset.id && !realAns.includes(sel.dataset.id)) {
            sel.style.background = 'red';
        }
    }
    //push user answer
    userAns.push(Number(sel.dataset.id));
    //timeout to clear divs and go to the next question or finish quiz
    setTimeout(() => {
        main2.innerHTML = '';
        actions.innerHTML = '';
        if (sel.dataset.index < questions.length) {
            generationQuestion(sel.dataset.index)
        } else {
            end();
        }
    }, 1000)
}
//finishing quiz
function end() {
    let correctAns = 0;
    for (i of userAns) {
        if (realAns.includes(i)) {
            correctAns++;
        }
    }
    console.log(correctAns + '/' + userAns.length)
}
//iniciar quiz
generationQuestion(0)