import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: 1,
      num2: 1,
      score: 0,
      response: "",
      incorrect: false
    };
  }
  render() {
    const { score } = this.state;
    const game = score >= 10 ? this.renderWin() : this.renderProblem();
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="spinning-logo" />
          {game}
        </div>
      </div>
    );
  }

  renderProblem = () => {
    const { num1, num2, score, response, incorrect } = this.state;
    return (
      <>
        <h1 className={incorrect ? "incorrect" : ""}>
          {num1} + {num2}
        </h1>
        <p>Enter the correct answer</p>
        <input
          onKeyPress={this.inputKeyPress}
          onChange={this.updateResponse}
          value={response}
          className="response-input"
        />
        <div className="score"> Score: {score}</div>
        <button onClick={this.reset}>reset</button>
      </>
    );
  };

  renderWin = () => {
    return (
      <>
        <h1> Congrats you win!</h1>
        <button onClick={this.reset}>reset</button>
      </>
    );
  };

  updateResponse = event => {
    this.setState({
      response: event.target.value
    });
  };

  inputKeyPress = event => {
    if (event.key === "Enter") {
      const answer = parseInt(this.state.response);
      if (answer === this.state.num1 + this.state.num2) {
        this.setState(state => ({
          score: state.score + 1,
          num1: Math.ceil(Math.random() * 10),
          num2: Math.ceil(Math.random() * 10),
          response: "",
          incorrect: false
        }));
      } else {
        this.setState({
          response: "",
          incorrect: true
        });
      }
    }
  };

  reset = () => {
    this.setState({
      score: 0
    });
  };
}

export default App;
