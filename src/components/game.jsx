import React, { Component } from "react";
import Player from "./player";
import Rounds from "./rounds";
import { withRouter } from "react-router-dom";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      players: null,
      movesInRound: 0,
      round: 1
    };
  }

  componentDidMount() {
    this.fecthGame();
    this.fecthRounds();
  }

  fecthGame = () => {
    const { id } = this.props.match.params;
    fetch(`http://localhost:8000/api/v1/games/${id}`, {
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
          players
        });
      });
  };

  fecthRounds = () => {
    const { id } = this.props.match.params;
    fetch(`http://localhost:8000/api/v1/rounds/games/${id}`, {
      method: "Get"
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(rounds => {
        console.log("Success:", rounds);
        this.setState({
          rounds,
          round: rounds.length ? rounds.length + 1 : 1
        });
      });
  };

  saveRound = (players, movesInRound, round) => {
    const data = {
      players: players
    };
    fetch("http://localhost:8000/api/v1/rounds/games/" + this.state.game, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
    })
      .then(res => {
        this.setState({
          players,
          movesInRound,
          round
        });
        this.fecthRounds();
        if (round >= 3) {
          this.declareWinner();
        }
      })
      .catch(error => console.error("Error:", error));
  };

  declareWinner = () => {
    const { id } = this.props.match.params;
    fetch(`http://localhost:8000/api/v1/games/${id}/winner/`, {
      method: "POST"
    })
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(winner => {
        console.log(winner);
        if (winner.winnerId) {
          this.props.history.push(`/games/${id}/winner`);
        }
      });
  };

  handleMove = (e, player) => {
    e.preventDefault();
    const move = e.target[0].value;
    const players = [...this.state.players];
    const playerIndex = players.indexOf(player);
    players[playerIndex] = { ...player };
    players[playerIndex].move = JSON.parse(move);
    let movesInRound = this.state.movesInRound + 1;
    let round = this.state.round;
    if (movesInRound === players.length) {
      movesInRound = 0;
      round = this.state.round + 1;
      this.saveRound(players, movesInRound, round);
    } else {
      this.setState({
        players,
        movesInRound,
        round
      });
    }
  };

  render() {
    const { players } = this.state;
    return (
      <div className="p-20">
        <h1 className="text-center">The Game with has begun!!!</h1>
        <h2 className="text-center">Round {this.state.round}</h2>
        <div className="grid-container grid-3">
          <Rounds rounds={this.state.rounds} />
          {players
            ? players.map(player => {
                return (
                  <div key={player.id} className="text-center">
                    <Player player={player} onMove={this.handleMove} />
                  </div>
                );
              })
            : "Loading players info..."}
        </div>
      </div>
    );
  }
}

export default withRouter(Game);
