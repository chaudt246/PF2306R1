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
      this.nextBtn = document.querySelector(".next_btn");
  
      this.questions = [
            {
                        question: "Haiku là thể thơ truyền thống của nước nào?",
                        answer: "Nhật Bản",
                        options: ["Nhật Bản", "Mông Cổ", "Trung Quốc", "Hàn Quốc"],
            },
            {
                        question: "Đâu là tên một loại bánh nổi tiếng ở Huế?",
                        answer: "Khoái",
                        options: ["Thích","Khoái","Vui","Sướng"],
            },
            {
                        question: "Gỗ mun có màu gì?",
                        answer: "Đen",
                        options: ["Vàng","Nâu","Đen","Xanh"],
            },
            {
                        question: "Đâu là tên một loại đồ chơi dân gian của trẻ em?",
                        answer: "Tò he",
                        options: ["Tò he","Tò mò","Tò vò","Tến tò"],
            },
            {
                        question: "Cướp biển còn được gọi với tên khác là gì?",
                        answer: "Hải tặc",
                        options: ["Đạo tặc","Lâm tặc","Tin tặc","Hải tặc"],
            }
          ];
  
      this.questionCounter = 0;
      this.currentQuestion;
      this.availableQuestions = [...this.questions];
      this.correctAnswers = 0;
      this.seconds = 15;
      this.timer = null;
      this.userAnswered = false;
  
      this.startBtn.addEventListener("click", () => this.showInfoBox());
      this.exitBtn.addEventListener("click", () => this.closeInfoBox());
      this.continueBtn.addEventListener("click", () => this.startQuiz());
      this.nextBtn.addEventListener("click", () => this.showNextQuestion());
    }
  
    showInfoBox() {
        this.infoBox.classList.add("activeInfo");
      }
    
      closeInfoBox() {
        this.infoBox.classList.remove("activeInfo");
      }
    
      startQuiz() {
        this.resultBox.classList.remove("activeResult");
        this.questionCounter = 0;
        this.correctAnswers = 0;
        this.availableQuestions = [...this.questions];
        this.quizBox.classList.add("activeQuiz");
        this.nextBtn.style.display = "none"; // Hide the "Câu tiếp theo" button
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
        this.timeCount.textContent = time < 10 ? "0" + time : time;
        time--;
  
        if (time < 0) {
          clearInterval(this.timer);
          this.timeText.textContent = "Hết thời gian";
          this.userAnswered = true;
          this.showAnswer();
        }
      }, 1000);
    }
  
    showAnswer() {
          const options = this.optionList.children;
      
          for (const opt of options) {
            opt.classList.add("disabled");
            if (opt.classList.contains("correct")) {
              opt.insertAdjacentHTML("beforeend", "<span class='icon tick'><i class='fas fa-check'></i></span>");
            }
            if (opt.classList.contains("incorrect")) {
              opt.insertAdjacentHTML("beforeend", "<span class='icon cross'><i class='fas fa-times'></i></span>");
            }
          }
      this.nextBtn.style.display = "block"; // Show the "Câu tiếp theo" button
      clearInterval(this.timer);
      this.userAnswered = true;
    }
  
    showNextQuestion() {
        this.nextBtn.style.display = "none"; // Hide the "Câu tiếp theo" button
        this.questionCounter++;
        this.showQuestion();
        this.userAnswered = false;
        this.resetOptions();
    }
    
      resetOptions() {
        const options = this.optionList.children;
        for (const opt of options) {
          opt.classList.remove("disabled", "correct", "incorrect");
          opt.removeChild(opt.querySelector(".icon"));
        }
        this.timeText.textContent = "Thời gian còn lại";
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