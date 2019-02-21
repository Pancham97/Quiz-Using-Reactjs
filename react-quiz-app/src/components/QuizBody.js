import React, { Component } from 'react';
import update from 'react-addons-update';
// import quizQuestions from '../api/quizQuestions';
import Quiz from '../quiz-components/Quiz';
import Result from '../quiz-components/Result';
import logo from '../svg/logo.svg';
import '../stylesheets/quiz.css';
import Timer from '../quiz-components/Timer';
import { BarLoader } from 'react-spinners';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testId: this.props.location.state.response.id,
      testName: this.props.location.state.response.name,
      questionMark: 0,
      time: {},
      seconds: JSON.parse(this.props.location.state.response.time),
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {
        correct: 0,
        incorrect: 0,
      },
      sub_skill_analysis : [],
      result: '',
      quizQuestions: JSON.parse(this.props.location.state.response.questions),
      checkedAnswers: {},
    };

    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  // Timer component.
  
  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    // console.log(this.props.location.state.response);
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  
  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
    
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds === 0) {
        setTimeout(() => this.setResults(this.getResults()), 300);
        clearInterval(this.timer);
    }
  }

  // Timer end

  // To check if a subtopic exist in the state. If not, add.
  checkSubTopicInArray(sub_topic, questionNumber) {
    var isFound = this.state.sub_skill_analysis.some(element => {
      return element.sub_topic === sub_topic;
    })

    if(! isFound) {
      let counter = 1;
      this.state.sub_skill_analysis.push({sub_topic: sub_topic, total: counter, obtained: 0, percentage: 0});
    } else {
      this.state.sub_skill_analysis.map(element => {
        var counter = element.total;
        if(element.sub_topic === sub_topic) {
          // console.log(element.sub_topic + " Counter: " + counter);
          element.total = counter + this.state.quizQuestions[questionNumber].mark;
        }
      });
    }
  }

  componentWillMount() {
    // console.log(this.state.quizQuestions);
    let quizQuestionArray = this.state.quizQuestions;

    quizQuestionArray.filter((value, index) => {
      // console.log(value.sub_skill);
      this.checkSubTopicInArray(value.sub_skill, index);
    });

    // console.log(this.state.sub_skill_analysis);

    // Setting incorrect to number of questions.
    this.state.answersCount = {correct: 0, incorrect: this.state.quizQuestions.length};
    // console.log(this.state.answersCount);

    // Shuffling options on load so that the order will be shuffled every time the test is given.
    const shuffledAnswerOptions = this.state.quizQuestions.map((question) => this.shuffleArray(question.answers));
    this.setState({
      question: this.state.quizQuestions[0].question,
      // answerOptions: quizQuestions[0].answers,
      answerOptions: shuffledAnswerOptions[0],
      questionMark: this.state.quizQuestions[0].mark,
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    //While there remain elements to shuffle...
    while( 0 !== currentIndex ) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      //And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  submitTest() {
    setTimeout(() => this.setResults(this.getResults()), 300);
  }

  handleAnswerSelected(event) {
    // console.log("Ticked: " + event.currentTarget.value);
    this.setUserAnswer(event.currentTarget.value);

    // if(this.state.questionId < this.state.quizQuestions.length) {
    //   setTimeout(() => this.setNextQuestion(), 300);
    //   // console.log(this.state.answersCount);
    // } else {
    //   setTimeout(() => this.setResults(this.getResults()), 300);
    // }
  }

  setUserAnswer(answer) {
    // console.log(answer);
    let updatedAnswersCount = 0;
    var checkboxValues = JSON.parse(localStorage.getItem('checkboxValues'))
    if (checkboxValues === null) {
      checkboxValues = {};
    }

    // console.log(this.state.checkedAnswers[this.state.counter])
    if(! this.state.checkedAnswers[this.state.counter]) {
      // console.log(this.state.checkedAnswers)
      this.state.checkedAnswers[this.state.counter] = answer;
      checkboxValues[this.state.counter] = answer;
      localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));




      if(answer === this.state.quizQuestions[this.state.counter].correct) {
        updatedAnswersCount = update(this.state.answersCount, {
          correct: {$apply: (currentValue) => currentValue + 1},
          incorrect: {$apply: (currentValue) => currentValue - 1}
        });

        this.state.sub_skill_analysis.map(element => {
          let counter = element.obtained;
          if(element.sub_topic === this.state.quizQuestions[this.state.counter].sub_skill) {
            element.obtained = counter + this.state.quizQuestions[this.state.counter].mark;
          }
        })
      } else {
        updatedAnswersCount = update(this.state.answersCount, {
          incorrect: {$apply: (currentValue) => currentValue}
        });
      }
    } else {
      // console.log(this.state.checkedAnswers)
      if(this.state.checkedAnswers[this.state.counter] === this.state.quizQuestions[this.state.counter].correct) {
        if(answer !== this.state.quizQuestions[this.state.counter].correct) {
          updatedAnswersCount = update(this.state.answersCount, {
            correct: {$apply: (currentValue) => currentValue - 1},
            incorrect: {$apply: (currentValue) => currentValue + 1}
          });
          this.state.checkedAnswers[this.state.counter] = answer;
          checkboxValues[this.state.counter] = answer;
          localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
          // console.log(this.state.checkedAnswers)
          this.state.sub_skill_analysis.map(element => {
            let counter = element.obtained;
            if(element.sub_topic === this.state.quizQuestions[this.state.counter].sub_skill) {
              element.obtained = counter - this.state.quizQuestions[this.state.counter].mark;
            }
          })
        } else {
          this.state.checkedAnswers[this.state.counter] = answer;
          checkboxValues[this.state.counter] = answer;
          localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
          updatedAnswersCount = update(this.state.answersCount, {
            correct: {$apply: (currentValue) => currentValue},
            incorrect: {$apply: (currentValue) => currentValue}
          });
        }
      } else {
        // console.log(this.state.checkedAnswers)
        if(answer === this.state.quizQuestions[this.state.counter].correct) {
          this.state.checkedAnswers[this.state.counter] = answer;
          checkboxValues[this.state.counter] = answer;
          localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
          // console.log(this.state.checkedAnswers)
          updatedAnswersCount = update(this.state.answersCount, {
            correct: {$apply: (currentValue) => currentValue + 1},
            incorrect: {$apply: (currentValue) => currentValue - 1}
          });

          this.state.sub_skill_analysis.map(element => {
            let counter = element.obtained;
            if(element.sub_topic === this.state.quizQuestions[this.state.counter].sub_skill) {
              element.obtained = counter + this.state.quizQuestions[this.state.counter].mark;
            }
          })
        } else {
          this.state.checkedAnswers[this.state.counter] = answer;
          checkboxValues[this.state.counter] = answer;
          localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
          // console.log(this.state.checkedAnswers)
          updatedAnswersCount = update(this.state.answersCount, {
            incorrect: {$apply: (currentValue) => currentValue}
          });
        }
      }
    }
    
    this.setState({
      answersCount: updatedAnswersCount,
      answer: answer
    });
  }

  setPreviousQuestion() {
    // console.log(this.state.answersCount);
    // console.log(this.state.sub_skill_analysis);
    if(this.state.questionId > 1) {
      const counter = this.state.counter - 1;
      const questionId = this.state.questionId - 1;

      // console.log(this.state.checkedAnswers[counter])
      
      // if(this.state.checkedAnswers[counter]) {
      //   console.log(this.state.checkedAnswers[counter])
      //   document.getElementById(this.state.checkedAnswers[counter]).checked = true;
      // }

      this.setState({
        counter: counter,
        questionId: questionId,
        question: this.state.quizQuestions[counter].question,
        answerOptions: this.state.quizQuestions[counter].answers,
        answer: '',
        questionMark: this.state.quizQuestions[counter].mark,
      });
      // console.log(document.getElementById(this.state.checkedAnswers[counter]))
    }
  }

  setNextQuestion() {
    // if(this.state.checkedAnswers[this.state.counter + 1]) {

    // }

    // console.log(this.state.answersCount);
    // console.log(this.state.sub_skill_analysis);
    if(this.state.questionId < this.state.quizQuestions.length) {
      // console.log(this.state);
      const counter = this.state.counter + 1;
      const questionId = this.state.questionId + 1;

      if(this.state.checkedAnswers[this.state.counter]) {
        document.getElementById(this.state.checkedAnswers[this.state.counter]).checked = true;
      }

      this.setState({
        counter: counter,
        questionId: questionId,
        question: this.state.quizQuestions[counter].question,
        answerOptions: this.state.quizQuestions[counter].answers,
        answer: '',
        questionMark: this.state.quizQuestions[counter].mark,
      });
    }
  }

  getResults() {
    const answersCount = this.state.answersCount;
    return answersCount;
  }

  setResults(result) {
    // console.log(result);
      this.setState({ result: result });
  }

  renderQuiz() {
    // console.log("Quiz called");
    return (
      <div className="quiz">
        <Timer
          // hours={this.state.time.h}
          minutes={this.state.time.m}
          seconds={this.state.time.s} />
        <Quiz
          testName={this.state.testName}
          questionMark={this.state.questionMark}
          answer={this.state.answer}
          answerOptions={this.state.answerOptions}
          questionId={this.state.questionId}
          question={this.state.question}
          questionTotal={this.state.quizQuestions.length}
          onAnswerSelected={this.handleAnswerSelected}
          checkedAnswer={this.state.checkedAnswers[this.state.questionId - 1]}
        />

        <div className="row center-align next-prev-buttons">
          <a onClick={() => this.setPreviousQuestion()} className="btn-large">Previous</a>
          <a onClick={() => this.setNextQuestion()} className="btn-large">Next</a>
        </div>
        
        <div className="row submit-button-row">
          <a href="#!" onClick={() => this.submitTest()} className="btn-large">Submit</a>
        </div>
      </div>
    );
  }

  updatePercentage() {
    this.state.sub_skill_analysis.map(element => {
      element.percentage = (element.obtained / element.total) * 100;
    })
  }

  renderResult() {
    this.updatePercentage();
    // console.log(this.state.sub_skill_analysis);
    return (
      <Result quizResult={this.state.result} subSkillAnalysis={JSON.stringify(this.state.sub_skill_analysis)} testId={this.state.testId} />
    );
  }

  render() {
    if(localStorage.getItem('checkboxValues')) {
      localStorage.removeItem('checkboxValues');
    }

    this.startTimer();
    return (
      <div className="App">
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default App;