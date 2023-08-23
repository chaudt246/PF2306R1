class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }
    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }
    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }
    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}


// ====================

class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}


// ====================

function populate() {
    if(quiz.isEnded()) {
        showScores();
        var congra_music = new Audio('./assets/congra_music.mp3');
        congra_music.play();
        playing_music.pause();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Câu số " + currentQuestionNumber + " trong tổng số " + quiz.questions.length+ " câu." ;
};

function showScores() {
    var gameOverHTML = "<h1>Kết quả</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>"+'<img id="congraImg" src="./assets/congra.jpg" alt="Win congratulations">';
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions
var questions = [
    new Question("Haiku là thể thơ truyền thống của nước nào?", ["Nhật Bản", "Mông Cổ","Trung Quốc", "Hàn Quốc"], "Nhật Bản"),
    new Question("Đâu là tên một loại bánh nổi tiếng ở Huế?", ["Thích", "Khoái", "Vui", "Sướng"], "Khoái"),
    new Question("Gỗ mun có màu gì?", ["Vàng", "Nâu","Đen", "Xanh"], "Đen"),
    new Question("Đâu là tên một loại đồ chơi dân gian của trẻ em?", ["Tò he", "Tò mò", "Tò vò", "Tến tò"], "Tò he"),
    new Question("Cướp biển còn được gọi với tên khác là gì?", ["Đạo tặc", "Lâm tặc", "Tin tặc", "Hải tặc"], "Hải tặc")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();