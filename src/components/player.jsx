import React, { Component } from "react";
import gameMoves from "../general/gameMoves";

class Player extends Component {
  renderPlayerMove = () => {
    const { player } = this.props;
    if (!player.move) {
      return (
        <div>
          <form onSubmit={e => this.props.onMove(e, player)}>
            <label>
              Select move
              <select className="">
                {gameMoves.map(move => {
                  return (
                    <option key={move.value} value={JSON.stringify(move)}>
                      {move.label}
                    </option>
                  );
                })}
              </select>
            </label>
            <input
              type="submit"
              className="btn btn-purple color-white"
              value="Play!"
            />
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <b>Selected Move: </b>
          {player.move.label}
        </div>
      );
    }
  };

  render() {
    const { player } = this.props;

    return (
      <div>
        <div>
          <h2>Player: {player.name}</h2>
        </div>
        {this.renderPlayerMove()}
      </div>
    );
  }
}

export default Player;
