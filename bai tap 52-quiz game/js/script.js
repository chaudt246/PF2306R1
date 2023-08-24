class QuizApp {
    constructor() {
      this.startButton = document.querySelector(".start_btn button");
      this.infoBox = document.querySelector(".info_box");
      this.exitButton = this.infoBox.querySelector(".buttons .quit");
      this.continueButton = this.infoBox.querySelector(".buttons .restart");
      this.quizBox = document.querySelector(".quiz_box");
      this.resultBox = document.querySelector(".result_box");
      this.optionList = document.querySelector(".option_list");
      this.timeLine = document.querySelector("header .time_line");
      this.timeText = document.querySelector(".timer .time_left_txt");
      this.timeCount = document.querySelector(".timer .timer_sec");
      this.restartButton = document.querySelector(".result_box .buttons .restart");
      this.stopButton = document.querySelector(".result_box .buttons .stop");
      this.myAudioPlaying = document.querySelector('#audio_playing');
      this.myAudioCongra = document.querySelector('#audio_congra');
      
      this.timeValue = 15;
      this.queCount = 0;
      this.queNumb = 1;
      this.userScore = 0;
      this.counter = null;
      this.counterLine = null;
      this.widthValue = 0;
  
      // Initialize event listeners
      this.startButton.addEventListener("click", () => this.showInfoBox());
      this.exitButton.addEventListener("click", () => this.hideInfoBox());
      this.continueButton.addEventListener("click", () => this.startQuiz());
      this.restartButton.addEventListener("click", () => this.restartQuiz());
      this.stopButton.addEventListener("click", () => this.stopApp());
    }
  
    showInfoBox() {
      this.infoBox.classList.add("activeInfo");
    }
  
    hideInfoBox() {
      this.infoBox.classList.remove("activeInfo");
    }
  
    startQuiz() {
      this.infoBox.classList.remove("activeInfo");
      this.quizBox.classList.add("activeQuiz");
      this.showQuestions(this.queCount);
      this.queCounter(this.queNumb);
      this.startTimer(this.timeValue);
      this.startTimerLine(this.widthValue);
      this.myAudioPlaying.play();

      // Attach event listener for the next_btn
      this.nextButton = document.querySelector(".next_btn");
      this.nextButton.addEventListener("click", () => this.nextQuestion());
    }
  
    showQuestions(index) {
      const questionText = document.querySelector(".que_text");
      let questionTag = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
      let optionTag = "";
      questions[index].options.forEach((option, i) => {
        optionTag += `<div class="option" onclick="quizApp.optionSelected(this)"><span>${option}</span></div>`;
      });
      questionText.innerHTML = questionTag;
      this.optionList.innerHTML = optionTag;
    }
  
    optionSelected(answer) {
      clearInterval(this.counter);
      clearInterval(this.counterLine);
      let userAns = answer.textContent;
      let correctAns = questions[this.queCount].answer;
      const allOptions = this.optionList.children.length;
      
      if (userAns == correctAns) {
        this.userScore += 1;
        answer.classList.add("correct");
        answer.innerHTML = `<span>${userAns}</span><i class="fas fa-check"></i>`;
      } else {
        answer.classList.add("incorrect");
        answer.innerHTML = `<span>${userAns}</span><i class="fas fa-times"></i>`;
        for (let i = 0; i < allOptions; i++) {
          if (this.optionList.children[i].textContent == correctAns) {
            this.optionList.children[i].classList.add("correct");
            this.optionList.children[i].innerHTML = `<span>${correctAns}</span><i class="fas fa-check"></i>`;
          }
        }
      }
      for (let i = 0; i < allOptions; i++) {
        this.optionList.children[i].classList.add("disabled");
      }
      this.nextButton.classList.add("show");
    }
  
    
      nextQuestion() {
        if (this.queCount < questions.length - 1) {
          this.queCount++;
          this.queNumb++;
          this.showQuestions(this.queCount);
          this.queCounter(this.queNumb);
          clearInterval(this.counter);
          clearInterval(this.counterLine);
          this.startTimer(this.timeValue);
          this.startTimerLine(this.widthValue);
          this.timeText.textContent = "Thời gian còn lại";
          this.nextButton.classList.remove("show");
          this.optionList.classList.remove("disabled");
        } else {
          clearInterval(this.counter);
          clearInterval(this.counterLine);
          this.showResult();
        }
        const allOptions = this.optionList.children.length;
        for (let i = 0; i < allOptions; i++) {
          this.optionList.children[i].classList.remove("correct", "incorrect");
        }
        this.nextButton.classList.remove("show");
      }
    
      showResult() {
        this.myAudioPlaying.pause();
        this.myAudioCongra.play();
        this.infoBox.classList.remove("activeInfo");
        this.quizBox.classList.remove("activeQuiz");
        this.resultBox.classList.add("activeResult");
        const scoreText = document.querySelector(".score_text");
        let scoreTag = "";
        if (this.userScore > 3) {
          scoreTag = `<span>Chúc mừng, bạn đã trả lời đúng <p>${this.userScore}</p> trên tổng số <p>${questions.length}</p></span>`;
        } else if (this.userScore >= 1) {
          scoreTag = `<span>Bạn chỉ trả lời đúng <p>${this.userScore}</p> trên tổng số <p>${questions.length}</p></span>`;
        } else {
          scoreTag = `<span>Rất tiếc, bạn trả lời đúng <p>${this.userScore}</p> trên tổng số <p>${questions.length}</p></span>`;
        }
        scoreText.innerHTML = scoreTag;
      }
    
  
      startTimer(time) {
        this.counter = setInterval(() => {
          this.timeCount.textContent = time;
          time--;
          if (time < 9) {
            this.timeCount.textContent = "0" + time;
          }
          if (time < 0) {
            clearInterval(this.counter);
            this.timeText.textContent = "Thời gian còn lại";
            this.timeCount.textContent = "00"; 
            
            // Check if an option was selected
            if (!this.optionList.querySelector(".option.correct")) {
              this.optionList.querySelectorAll(".option").forEach(option => {
                option.classList.add("disabled");
              });
              this.nextButton.classList.add("show");
            }
            
            // If it's the last question and no option was selected
            if (this.queCount === questions.length - 1 && !this.optionList.querySelector(".option.correct")) {
              clearInterval(this.counterLine);
              this.showResult();
            } else {
              // Move to the next question
              this.nextButton.addEventListener("click", () => {
                this.nextQuestion();
              });
            }
          }
        }, 1000);
      }
  
    startTimerLine(time) {
      this.counterLine = setInterval(() => {
        time += 1;
        this.timeLine.style.width = time + "px";
        if (time > 549) {
          clearInterval(this.counterLine);
        }
      }, 29);
    }
  
    queCounter(index) {
      const totalQueTag = `<span><p>${index}</p> trong tổng số <p>${questions.length}</p> câu hỏi</span>`;
      document.querySelector("footer .total_que").innerHTML = totalQueTag;
    }

    restartQuiz() {
        this.resultBox.classList.remove("activeResult");
        this.quizBox.classList.add("activeQuiz");
        this.queCount = 0;
        this.queNumb = 1;
        this.userScore = 0;
        this.widthValue = 0;
        this.showQuestions(this.queCount);
        this.queCounter(this.queNumb);
        this.startTimer(this.timeValue);
        this.startTimerLine(this.widthValue);
        this.myAudioCongra.pause();
        this.myAudioPlaying.play();
      }
    
      stopApp() {
        window.location.reload(); //reload the current window
      }
  }
  
  const quizApp = new QuizApp();  