class QuizApp {
    constructor() {
      this.startBtn = document.querySelector(".start_btn button");
      this.infoBox = document.querySelector(".info_box");
      this.exitBtn = this.infoBox.querySelector(".buttons .quit");
      this.continueBtn = this.infoBox.querySelector(".buttons .restart");
      this.quizBox = document.querySelector(".quiz_box");
      this.resultBox = document.querySelector(".result_box");
      this.optionList = document.querySelector(".option_list");
      this.timeLine = document.querySelector("header .time_line");
      this.timeText = document.querySelector(".timer .time_left_txt");
      this.timeCount = document.querySelector(".timer .timer_sec");
  
      this.questions = [
        {
          question: "Haiku là thể thơ truyền thống của nước nào?",
          answer: "Nhật Bản",
          options: ["Nhật Bản", "Mông Cổ", "Trung Quốc", "Hàn Quốc"],
        },
        // ... (other questions)
      ];
  
      this.questionCounter = 0;
      this.currentQuestion;
      this.availableQuestions = [...this.questions];
      this.correctAnswers = 0;
      this.seconds = 15;
      this.timer;
      this.userAnswered = false;
  
      this.startBtn.addEventListener("click", () => this.showInfoBox());
      this.exitBtn.addEventListener("click", () => this.closeInfoBox());
      this.continueBtn.addEventListener("click", () => this.startQuiz());
    }
  
    showInfoBox() {
      this.infoBox.classList.add("activeInfo");
    }
  
    closeInfoBox() {
      this.infoBox.classList.remove("activeInfo");
    }
  
    startQuiz() {
      this.infoBox.classList.remove("activeInfo");
      this.quizBox.classList.add("activeQuiz");
      this.showQuestion();
      this.startTimer(this.seconds);
    }
  
    showQuestion() {
      if (this.availableQuestions.length === 0 || this.questionCounter >= this.questions.length) {
        this.quizOver();
        return;
      }
  
      this.currentQuestion = this.availableQuestions[this.questionCounter];
      const questionText = document.querySelector(".que_text");
      questionText.textContent = this.currentQuestion.question;
  
      this.optionList.innerHTML = "";
      for (const option of this.currentQuestion.options) {
        const optionElement = document.createElement("div");
        optionElement.textContent = option;
        optionElement.classList.add("option");
        optionElement.addEventListener("click", () => this.checkAnswer(optionElement));
        this.optionList.appendChild(optionElement);
      }
    }
  
    startTimer(time) {
      this.timer = setInterval(() => {
        this.timeCount.textContent = time;
        time--;
        if (time < 9) {
          let addZero = this.timeCount.textContent;
          this.timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
          clearInterval(this.timer);
          this.timeText.textContent = "Hết thời gian";
          this.userAnswered = true;
          this.showAnswer();
        }
      }, 1000);
    }
  
    checkAnswer(option) {
      if (!this.userAnswered) {
        this.userAnswered = true;
        clearInterval(this.timer);
        const userAnswer = option.textContent;
        const correctAnswer = this.currentQuestion.answer;
  
        if (userAnswer === correctAnswer) {
          option.classList.add("correct");
          this.correctAnswers++;
        } else {
          option.classList.add("incorrect");
  
          const options = this.optionList.children;
          for (const opt of options) {
            if (opt.textContent === correctAnswer) {
              opt.classList.add("correct");
            }
          }
        }
        this.showAnswer();
      }
    }
  
    showAnswer() {
      const options = this.optionList.children;
  
      for (const opt of options) {
        opt.classList.add("disabled");
        if (opt.classList.contains("correct")) {
          opt.insertAdjacentHTML("beforeend", "<span class='icon tick'>O</span>");
        }
        if (opt.classList.contains("incorrect")) {
          opt.insertAdjacentHTML("beforeend", "<span class='icon cross'>X</span>");
        }
      }
  
      setTimeout(() => {
        this.questionCounter++;
        this.showQuestion();
        this.userAnswered = false;
  
        for (const opt of options) {
          opt.classList.remove("disabled", "correct", "incorrect");
          opt.removeChild(opt.querySelector(".icon"));
        }
  
        this.timeText.textContent = "Thời gian còn lại";
        this.timeCount.textContent = this.seconds;
        this.startTimer(this.seconds);
      }, 2000);
    }
  
    quizOver() {
      this.quizBox.classList.remove("activeQuiz");
      this.resultBox.classList.add("activeResult");
  
      const scoreText = this.resultBox.querySelector(".score_text");
      if (this.correctAnswers === this.questions.length) {
        scoreText.innerHTML = `<span>Bạn đã trả lời đúng tất cả câu hỏi!</span>`;
      } else {
        scoreText.innerHTML = `<span>Bạn trả lời đúng ${this.correctAnswers} câu hỏi trong tổng số ${this.questions.length} câu hỏi.</span>`;
      }
    }
  }
  
  const quizApp = new QuizApp();
  