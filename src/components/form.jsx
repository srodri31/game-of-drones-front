import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: "",
      player2: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { player1, player2 } = this.state;
    const data = { players: [player1, player2] };
    fetch("http://localhost:8000/api/v1/games", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => console.log("Success:", response));
    this.props.history.push("/url");
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { player1, player2 } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Player 1
            <input
              type="text"
              value={player1}
              name="player1"
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Player 2
            <input
              type="text"
              value={player2}
              name="player2"
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          <input type="submit" value="Start" />
        </div>
      </form>
    );
  }
}

export default withRouter(Form);
