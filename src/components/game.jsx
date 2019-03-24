import React, { Component } from "react";
import Player from "./player";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      player1: null,
      player2: null
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/v1/games/" + this.props.match.params.id, {
      method: "Get"
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(game => {
        console.log("Success:", game);
        this.setState({
          game: game.id,
          player1: game.players[0],
          player2: game.players[1],
          round: 1
        });
      });
  }

  render() {
    return (
      <div>
        <h1>Game with ID {this.props.match.params.id} has begun!!!</h1>
        <h2>Round {this.state.round}</h2>
        <div>
          {this.state.game ? `Game: ${this.state.game}` : "Loading game.."}
        </div>
        <div>
          <div>
            {this.state.player1 ? (
              <Player player={this.state.player1} />
            ) : (
              "Loading first player info.."
            )}
          </div>
          <div>
            {this.state.player2 ? (
              <Player player={this.state.player2} />
            ) : (
              "Loading second player info.."
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
