import React, { Component } from "react";
import Player from "./player";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      players: null
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
        const players = game.players.map(player => {
          return { ...player, move: null };
        });
        this.setState({
          game: game.id,
          players,
          round: 1
        });
      });
  }

  render() {
    const { players } = this.state;
    return (
      <div>
        <h1>Game with ID {this.props.match.params.id} has begun!!!</h1>
        <h2>Round {this.state.round}</h2>
        <div>
          {this.state.game ? `Game: ${this.state.game}` : "Loading game.."}
        </div>
        <div>
          {players
            ? players.map(player => {
                return (
                  <div key={player.id}>
                    <Player player={player} />
                  </div>
                );
              })
            : "Loading players info"}
        </div>
      </div>
    );
  }
}

export default Game;
