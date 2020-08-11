import React, { Component } from "react";
// import question from "./testQuestions.json"
import Timer from "../../components/Timer/Timer";
import API from "../../util/API";
import "./Quiz.css";

class Quiz extends Component {
  state = {
    quiz: [],
    question: "",
    choices: [],
    answer: "",
    index: 0,
    isDone: false,
  };

  randomizeArray(oldArray) {
    var newArray = [];
    for (var i = oldArray.length; i > 0; i--) {
      var randIndex = Math.floor(Math.random() * oldArray.length);
      newArray.push(oldArray[randIndex]);
      oldArray.splice(randIndex, 1);
    }
    return newArray;
  }

  //Start timer and get 1st question from database
  componentDidMount() {
    API.getQuestions().then((res) => {
      let quiz = this.randomizeArray(res.data);
      this.setState({
        quiz: quiz,
        question: quiz[0].question,
        choices: this.randomizeArray(quiz[0].choices),
        answer: quiz[0].answer,
      });
    });
  }

  handleButtonPress = (event) => {
    event.preventDefault();
    //check if the guess is correct
    console.log(event.target.value);
    if (event.target.value === this.state.answer) {
      console.log("You Guessed Correctly");
      //handling for when the game is completed
      console.log(this.state.index);

      if (this.state.quiz.length === this.state.index + 1) {
        console.log("You completed the game");
        this.setState({ isDone: true });
      } else {
        //update the page with the next set of questions
        this.setState({ index: this.state.index + 1 }, () => {
          this.setState({
            question: this.state.quiz[this.state.index].question,
            choices: this.randomizeArray(
              this.state.quiz[this.state.index].choices
            ),
            answer: this.state.quiz[this.state.index].answer,
          });
        });
      }
    }

    //if guess incorrectly
    else {
      console.log("You Guessed Incorrectly");
      console.log(event.target.value);
    }
  };

  render() {
    return (
      <div className="container">
        <Timer isDone={this.state.isDone} />
        <h1 className="question">{this.state.question}</h1>
        <button
          className="quizChoice"
          onClick={this.handleButtonPress}
          value={this.state.choices[0]}
        >
          {this.state.choices[0]}
        </button>
        <button
          className="quizChoice"
          onClick={this.handleButtonPress}
          value={this.state.choices[1]}
        >
          {this.state.choices[1]}
        </button>
        <button
          className="quizChoice"
          onClick={this.handleButtonPress}
          value={this.state.choices[2]}
        >
          {this.state.choices[2]}
        </button>
        <button
          className="quizChoice"
          onClick={this.handleButtonPress}
          value={this.state.choices[3]}
        >
          {this.state.choices[3]}
        </button>
      </div>
    );
  }
}

export default Quiz;
