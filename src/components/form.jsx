import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import URL_API from "../general/constants";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: "",
      player2: "",
      errorP1: null,
      errorP2: null
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { player1, player2 } = this.state;
    let errorP1 = this.validatePlayer(player1);
    let errorP2 = this.validatePlayer(player2);
    if (errorP1 || errorP2) {
      this.setState({
        errorP1,
        errorP2
      });
    } else {
      const data = { players: [player1, player2] };
      fetch(`${URL_API}/api/v1/games`, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors"
      })
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(game => {
          console.log("Success:", game);
          this.props.history.push(`/games/${game.id}`);
        });
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  validatePlayer = player => {
    if (!player) return "Player name is required";
    return null;
  };

  classForInput = error => {
    let className = "input ";
    if (error) className += "error";
    return className;
  };

  render() {
    const { player1, player2, errorP1, errorP2 } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="p-5">
          <label htmlFor="player1" className="p-5">
            Player 1
          </label>
          <input
            type="text"
            value={player1}
            id="player1"
            name="player1"
            className={this.classForInput(errorP1)}
            onChange={this.handleChange}
          />
        </div>
        <div className="p-5">
          <label htmlFor="player2" className="p-5">
            Player 2
          </label>
          <input
            type="text"
            value={player2}
            id="player2"
            name="player2"
            className={this.classForInput(errorP2)}
            onChange={this.handleChange}
          />
        </div>
        <div className="text-center p-15">
          <input
            type="submit"
            value="Start"
            className="btn btn-purple color-white"
          />
        </div>
      </form>
    );
  }
}

export default withRouter(Form);
